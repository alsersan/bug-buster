import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectDocument, ProjectModelName } from 'src/schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(ProjectModelName) private projectModel: Model<ProjectDocument>,
  ) {}

  create(createProjectDto: CreateProjectDto) {
    return new this.projectModel(createProjectDto).save();
  }

  findAll() {
    return this.projectModel.find();
  }

  findOne(id: string) {
    return this.projectModel.findOne({ _id: id });
  }

  update(id: string, updateProjectDto: UpdateProjectDto) {
    return this.projectModel.findByIdAndUpdate(id, updateProjectDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.projectModel.findByIdAndDelete(id);
  }
}
