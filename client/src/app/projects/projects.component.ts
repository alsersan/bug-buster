import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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

  constructor(private store: Store<{ projects: Project[] }>) {}

  ngOnInit(): void {
    this.store.dispatch(getAllprojects());
  }

  addProject() {
    const project: NewProject = {
      name: 'Guau',
      description: 'project test',
      dateCreated: 'today',
      members: {
        projectManager: '61aa5bb1961b19bc89b6a6f6',
      },
    };
    this.store.dispatch(createProject({ project }));
  }

  deleteProjectNow(projectId: string) {
    this.store.dispatch(deleteProject({ projectId }));
  }
}
