import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectComponent } from './project/project.component';
import { MembersComponent } from './members/members.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { TicketsComponent } from './tickets/tickets.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectComponent,
    MembersComponent,
    ProjectDetailsComponent,
    TicketsComponent,
    CreateProjectComponent,
  ],
  imports: [CommonModule, ProjectsRoutingModule, ReactiveFormsModule],
})
export class ProjectsModule {}
