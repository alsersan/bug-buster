import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectDocument } from './schemas/project.schema';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { addItemToList, removeItemFromList } from 'src/utils/add-remove-items';
import { getChangedItems } from 'src/utils/get-changed-items';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const newProject = await this.projectModel.create(createProjectDto);
    await addItemToList(
      newProject.members.projectManager,
      'projects',
      newProject._id,
      this.userModel,
    );
    const queryResult = this.projectModel.findById(newProject._id);
    return this.processQuery(queryResult);
  }

  async getAllProjects(): Promise<Project[]> {
    const queryResult = this.projectModel.find();
    return this.processQuery(queryResult);
  }

  async getProjectById(projectId: string): Promise<Project> {
    const queryResult = this.projectModel.findById(projectId);
    return this.processQuery(queryResult);
  }

  async updateProject(
    projectId: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    console.log('UPDATE', updateProjectDto);
    if (updateProjectDto.hasOwnProperty('members')) {
      const previousState = await this.projectModel.findById(projectId);
      const previousMembers = previousState.members;
      const newMembers = updateProjectDto.members;

      const previousArray = [
        previousMembers.projectManager,
        ...previousMembers.developers,
        ...previousMembers.qualityAssurance,
      ];
      const newArray = [
        newMembers.projectManager,
        ...newMembers.developers,
        ...newMembers.qualityAssurance,
      ];
      const { removed, added } = getChangedItems(previousArray, newArray);

      for (let i = 0; i < removed.length; i++) {
        await removeItemFromList(
          removed[i],
          'projects',
          projectId,
          this.userModel,
        );
      }

      for (let i = 0; i < added.length; i++) {
        await addItemToList(added[i], 'projects', projectId, this.userModel);
      }
    }
    const queryResult = this.projectModel.findByIdAndUpdate(
      projectId,
      updateProjectDto,
      {
        new: true,
      },
    );
    return this.processQuery(queryResult);
  }

  async deleteProject(projectId: string) {
    const deletedProject = await this.projectModel.findByIdAndDelete(projectId);

    // DELETE FROM USERS
    const membersArray = [
      deletedProject.members.projectManager,
      ...deletedProject.members.developers,
      ...deletedProject.members.qualityAssurance,
    ];
    for (let i = 0; i < membersArray.length; i++) {
      await removeItemFromList(
        membersArray[i],
        'projects',
        deletedProject._id,
        this.userModel,
      );
    }
    return { deletedProjectId: deletedProject._id };
  }

  processQuery(queryResult) {
    return queryResult
      .select('-members._id')
      .populate({
        path: 'tickets',
        select: '-__v',
        populate: {
          path: 'assignedTo author',
          select: '-__v -password -tickets -projects',
        },
      })
      .populate({
        path: 'tickets',
        select: '-__v',
        populate: {
          path: 'comments',
          select: '-__v ',
          populate: {
            path: 'author',
            select: '-__v -password -tickets -projects',
          },
        },
      })
      .populate({
        path: 'members',
        populate: {
          path: 'projectManager developers qualityAssurance',
          select: '-__v -password -tickets -projects',
        },
      });
  }
}
