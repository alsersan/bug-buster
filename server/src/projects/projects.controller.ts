import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { roles } from 'src/utils/roles';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Roles(roles.admin)
  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    return await this.projectsService.createProject(createProjectDto);
  }

  @Get()
  async findAll() {
    return await this.projectsService.getAllProjects();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.projectsService.getProjectById(id);
  }

  @Roles(roles.admin, roles.projectManager)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return await this.projectsService.updateProject(id, updateProjectDto);
  }

  @Roles(roles.admin)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.projectsService.deleteProject(id);
  }
}
