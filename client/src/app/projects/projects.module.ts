import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectComponent } from './project/project.component';
import { MembersComponent } from './members/members.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { TicketsComponent } from './tickets/tickets.component';


@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectComponent,
    MembersComponent,
    ProjectDetailsComponent,
    TicketsComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule
  ]
})
export class ProjectsModule { }
