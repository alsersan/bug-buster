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
      const projectManager = await this.userModel.findById(
        newProject.members.projectManager,
      );
      projectManager.projects = [...projectManager.projects, newProject._id];
      projectManager.save();
    }
    const query = this.projectModel.findById(newProject._id);
    return this.processQuery(query);
  }

  async getAllProjects(): Promise<Project[]> {
    const query = this.projectModel.find();
    return this.processQuery(query);
  }

  async getProjectById(projectId: string): Promise<Project> {
    const query = this.projectModel.findById(projectId);
    return this.processQuery(query);
  }

  async updateProject(
    projectId: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return this.projectModel.findByIdAndUpdate(projectId, updateProjectDto, {
      new: true,
    });
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
}
