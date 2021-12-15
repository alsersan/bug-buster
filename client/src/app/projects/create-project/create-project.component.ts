import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { NewProject, Project } from 'src/app/models/project.model';
import { User } from 'src/app/models/user.model';
import { createProject } from 'src/app/store/projects/projects.actions';
import { getAllUsers } from 'src/app/store/users/users.actions';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit, OnDestroy {
  /* managers = [
    { name: 'bla', _id: '2' },
    { name: 'blu', _id: '3' },
    {
      name: '61aa5d8510c9e6570de7332e',
      _id: '61aa5d8510c9e6570de7332e',
      hidden: true,
    },
  ]; */
  createProject!: FormGroup;
  managers!: User[];
  subscription: Subscription = this.store
    .select('users')
    .subscribe(
      (users) =>
        (this.managers = users.filter(
          (user) => user.role === 'project-manager'
        ))
    );

  constructor(private store: Store<{ projects: Project[]; users: User[] }>) {}

  ngOnInit() {
    this.store.dispatch(getAllUsers());

    this.createProject = new FormGroup(
      {
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        projectManager: new FormControl('', Validators.required),
      },
      { updateOn: 'blur' }
    );
  }

  onSubmit() {
    if (this.createProject.valid) {
      const formResult = this.createProject.value;
      const project: NewProject = {
        name: formResult.name.trim(),
        description: formResult.description.trim(),
        dateCreated: new Date(),
        members: { projectManager: formResult.projectManager },
      };
      this.store.dispatch(createProject({ project }));
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
