import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectDocument } from './schemas/project.schema';
import { User, UserDocument } from 'src/users/schemas/user.schema';
@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const newProject = await this.projectModel.create(createProjectDto);
    if (newProject.members?.projectManager) {
      await this.addProjectToUser(
        newProject.members.projectManager,
        newProject._id,
      );
    }
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
      const { removed, added } = this.changedItems(previousArray, newArray);

      for (let i = 0; i < removed.length; i++) {
        await this.removeProjectFromUser(removed[i], projectId);
      }

      for (let i = 0; i < added.length; i++) {
        await this.addProjectToUser(added[i], projectId);
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
    return this.projectModel.findByIdAndDelete(projectId);
  }

  processQuery(queryResult) {
    return queryResult
      .select('-__v -members._id')
      .populate('tickets', '-__v -modifications -assignedTo -author')
      .populate({
        path: 'members',
        populate: {
          path: 'projectManager developers qualityAssurance',
          select: '-__v -password -tickets -projects -role',
        },
      });
  }

  async addProjectToUser(userId, newProjectId) {
    const user = await this.userModel.findById(userId);
    user.projects = [...user.projects, newProjectId];
    user.save();
  }

  async removeProjectFromUser(userId, removedProjectId) {
    const user = await this.userModel.findById(userId);
    user.projects = user.projects.filter((el) => {
      return el.toString() !== removedProjectId;
    });
    user.save();
  }

  changedItems(previousArr, newArr) {
    // Transforming to string is necessary, as one of the parameter is an ObjectId and the other a string
    const isSameValue = (a, b) => a.toString() === b.toString();
    const compareArrays = (arr1, arr2, compareFunction) =>
      arr1.filter(
        (arr1Value) =>
          !arr2.some((arr2Value) => compareFunction(arr1Value, arr2Value)),
      );

    const removed = compareArrays(previousArr, newArr, isSameValue);
    const added = compareArrays(newArr, previousArr, isSameValue);
    return { removed, added };
  }
}
