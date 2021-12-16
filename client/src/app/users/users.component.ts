import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User, UserState } from '../models/user.model';
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
  loguedInUser!: User;

  constructor(
    private store: Store<{ users: User[]; loguedInUser: UserState }>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getAllUsers());
    this.store
      .select('loguedInUser')
      .subscribe((user) => (this.loguedInUser = user.user));
  }

  delete(userId: string) {}
}
