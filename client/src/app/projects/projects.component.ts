import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NewProject, Project } from '../models/project.model';
import {
  createProject,
  deleteProject,
  getAllprojects,
} from '../store/projects/projects.actions';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Array<Project>> = this.store.select('projects');

  constructor(
    private store: Store<{ projects: Project[] }>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getAllprojects());
  }

  delete(projectId: string) {
    this.store.dispatch(deleteProject({ projectId }));
  }

  addProject() {
    this.router.navigateByUrl('/projects/create');
  }

  viewDetails(projectId: string) {
    this.router.navigateByUrl(`/projects/${projectId}`);
  }
}
