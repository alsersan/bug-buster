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
    if (newProject.members.projectManager) {
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
      if (previousMembers.projectManager !== newMembers.projectManager) {
        await this.removeProjectFromUser(
          previousMembers.projectManager,
          projectId,
        );
        await this.addProjectToUser(newMembers.projectManager, projectId);
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
    return queryResult.select('-__v -members._id').populate({
      path: 'members',
      populate: {
        path: 'projectManager developers qualityAssurance',
        select: '-__v -password -tickets -projects',
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
      console.log('removedProjectId', removedProjectId);
      return el.toString() !== removedProjectId;
    });
    user.save();
  }
}
