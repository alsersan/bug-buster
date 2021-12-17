import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User, UserState } from 'src/app/models/user.model';
import { logout } from 'src/app/store/auth/auth.actions';
import { capitalizedRoles } from 'src/app/utils/roles';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  roles = capitalizedRoles;
  loguedInUser!: UserState;

  constructor(private store: Store<{ loguedInUser: UserState }>) {}

  ngOnInit() {
    this.store
      .select('loguedInUser')
      .subscribe((user) => (this.loguedInUser = user));
  }

  logoutUser() {
    this.store.dispatch(logout());
  }
}
