import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User, UserState } from '../models/user.model';
import { capitalizedRoles } from '../utils/roles';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  roles = capitalizedRoles;
  user!: User;
  constructor(private store: Store<{ loguedInUser: UserState }>) {}

  ngOnInit() {
    this.store
      .select('loguedInUser')
      .subscribe((user) => (this.user = user.user));
  }
}
