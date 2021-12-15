import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/project.model';
import { User } from 'src/app/models/user.model';
import { getAllUsers } from 'src/app/store/users/users.actions';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss'],
})
export class EditProjectComponent implements OnInit, OnDestroy {
  @Input() project!: Project;
  editProject!: FormGroup;
  managers: User[] = [];
  developers: User[] = [];
  qualityAssuranceMembers: User[] = [];
  statusOptions = ['active', 'closed'];

  subscription: Subscription = this.store.select('users').subscribe((users) =>
    users.forEach((user) => {
      if (user.role === 'project-manager') {
        this.managers.push(user);
      }
      if (user.role === 'developer') {
        this.developers.push(user);
      }
      if (user.role === 'quality-assurance') {
        this.qualityAssuranceMembers.push(user);
      }
    })
  );

  constructor(private store: Store<{ users: User[] }>) {}

  ngOnInit(): void {
    this.store.dispatch(getAllUsers());

    this.editProject = new FormGroup({
      status: new FormControl(''),
      projectManager: new FormControl(''),
      developers: new FormControl(''),
      qualityAssurance: new FormControl(''),
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
