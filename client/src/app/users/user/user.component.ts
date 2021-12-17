import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { getUserById } from 'src/app/store/users/users.actions';
import { capitalizedRoles } from 'src/app/utils/roles';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  roles = capitalizedRoles;
  user!: User;
  users$: Subscription = this.store
    .select('users')
    .pipe(
      map(
        (array) =>
          array.find((el) => el._id === this.route.snapshot.paramMap.get('id'))!
      )
    )
    .subscribe((el) => (this.user = el));

  constructor(
    private store: Store<{ users: User[] }>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store.dispatch(
      getUserById({ userId: this.route.snapshot.paramMap.get('id')! })
    );
  }

  ngOnDestroy() {
    this.users$.unsubscribe();
  }
}
