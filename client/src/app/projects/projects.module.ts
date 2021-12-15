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
import { TicketComponent } from './ticket/ticket.component';
import { TicketCommentsComponent } from './ticket-comments/ticket-comments.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { TicketMembersComponent } from './ticket-members/ticket-members.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectComponent,
    MembersComponent,
    ProjectDetailsComponent,
    TicketsComponent,
    CreateProjectComponent,
    TicketComponent,
    TicketCommentsComponent,
    TicketDetailsComponent,
    TicketMembersComponent,
    CreateTicketComponent,
  ],
  imports: [CommonModule, ProjectsRoutingModule, ReactiveFormsModule],
})
export class ProjectsModule {}
