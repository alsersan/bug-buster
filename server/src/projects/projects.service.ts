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

  async create(createProjectDto: CreateProjectDto) {
    const newProject = await new this.projectModel(createProjectDto).save();
    const query = this.projectModel.findById(newProject._id.toString());
    return this.processQuery(query);
  }

  findAll() {
    const query = this.projectModel.find();
    return this.processQuery(query);
  }

  findOne(id: string) {
    const query = this.projectModel.findById(id);
    return this.processQuery(query);
  }

  update(id: string, updateProjectDto: UpdateProjectDto) {
    return this.projectModel.findByIdAndUpdate(id, updateProjectDto, {
      new: true,
    });
  }

  remove(id: string) {
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
