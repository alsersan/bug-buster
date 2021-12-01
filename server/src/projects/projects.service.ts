import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectDocument } from './schemas/project.schema';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const newProject = await this.projectModel.create(createProjectDto);
    const query = this.projectModel.findById(newProject._id);
    return this.processQuery(query);
  }

  async getAllProjects(): Promise<Project[]> {
    const query = this.projectModel.find();
    return this.processQuery(query);
  }

  async getProjectById(id: string): Promise<Project> {
    const query = this.projectModel.findById(id);
    return this.processQuery(query);
  }

  async updateProject(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return this.projectModel.findByIdAndUpdate(id, updateProjectDto, {
      new: true,
    });
  }

  async deleteProject(id: string) {
    return this.projectModel.findByIdAndDelete(id);
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
