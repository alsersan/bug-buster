import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Project } from 'src/app/models/project.model';
import { deleteProject } from 'src/app/store/projects/projects.actions';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent {
  @Input() project!: Project;

  constructor(
    private store: Store<{ projects: Project[] }>,
    private router: Router
  ) {}

  delete(projectId: string) {
    this.store.dispatch(deleteProject({ projectId }));
    this.router.navigateByUrl('/projects');
  }
}
