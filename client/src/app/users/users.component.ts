import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { getAllUsers } from '../store/users/users.actions';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users$: Observable<Array<User>> = this.store.select('users');

  constructor(
    private store: Store<{ users: User[] }>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getAllUsers());
  }

  addUser() {
    this.router.navigateByUrl('/users/create');
  }

  viewDetails(userId: string) {
    this.router.navigateByUrl(`/users/${userId}`);
  }
}
