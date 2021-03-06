import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsComponent } from './projects.component';
import { TicketComponent } from './ticket/ticket.component';

const routes: Routes = [
  { path: '', component: ProjectsComponent },
  { path: 'create', component: CreateProjectComponent },
  { path: ':id', component: ProjectComponent },
  { path: ':id/tickets/:ticketId', component: TicketComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
