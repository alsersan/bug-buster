import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { getAllUsers } from '../store/users/users.actions';
import { capitalizedRoles } from '../utils/roles';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  roles = capitalizedRoles;
  users$: Observable<Array<User>> = this.store.select('users');

  constructor(
    private store: Store<{ users: User[] }>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getAllUsers());
  }

  delete(userId: string) {}
}
