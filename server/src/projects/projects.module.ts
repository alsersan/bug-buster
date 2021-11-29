import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectModelName, ProjectSchema } from 'src/schemas/project.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProjectModelName, schema: ProjectSchema },
    ]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
