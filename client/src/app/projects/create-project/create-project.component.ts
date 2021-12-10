import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Project } from 'src/app/models/project.model';
import { createProject } from 'src/app/store/projects/projects.actions';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent {
  createProject = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    dateCreated: new FormControl(''),
    projectManager: new FormControl('61aa5d8510c9e6570de7332e'),
  });
  constructor(
    private store: Store<{ projects: Project[] }>,
    private router: Router
  ) {}

  onSubmit() {
    const formResult = this.createProject.value;
    const project = {
      name: formResult.name,
      description: formResult.description,
      dateCreated: 'today',
      members: { projectManager: formResult.projectManager },
    };
    this.store.dispatch(createProject({ project }));
  }
}
