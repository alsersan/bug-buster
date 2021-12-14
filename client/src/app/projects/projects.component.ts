import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';
import {
  deleteProject,
  getAllProjects,
} from '../store/projects/projects.actions';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Array<Project>> = this.store.select('projects');

  constructor(private store: Store<{ projects: Project[] }>) {}

  ngOnInit(): void {
    this.store.dispatch(getAllProjects());
  }

  delete(projectId: string) {
    this.store.dispatch(deleteProject({ projectId }));
  }
}
