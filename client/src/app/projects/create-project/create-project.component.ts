import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NewProject, Project } from 'src/app/models/project.model';
import { createProject } from 'src/app/store/projects/projects.actions';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit {
  managers = [
    { name: 'bla', _id: '2' },
    { name: 'blu', _id: '3' },
    {
      name: '61aa5d8510c9e6570de7332e',
      _id: '61aa5d8510c9e6570de7332e',
      hidden: true,
    },
  ];
  createProject!: FormGroup;

  constructor(private store: Store<{ projects: Project[] }>) {}

  ngOnInit() {
    this.createProject = new FormGroup(
      {
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        projectManager: new FormControl(
          '61aa5d8510c9e6570de7332e',
          Validators.required
        ),
      },
      { updateOn: 'blur' }
    );
  }

  onSubmit() {
    if (this.createProject.valid) {
      const formResult = this.createProject.value;
      const project: NewProject = {
        name: formResult.name,
        description: formResult.description,
        dateCreated: new Date(),
        members: { projectManager: formResult.projectManager },
      };
      this.store.dispatch(createProject({ project }));
    }
  }
}
