import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { getUserById } from 'src/app/store/users/users.actions';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  users$: Observable<Array<User>> = this.store.select('users');
  user$: Observable<User> = this.users$.pipe(
    map(
      (array) =>
        array.find((el) => el._id === this.route.snapshot.paramMap.get('id'))!
    )
  );

  constructor(
    private store: Store<{ users: User[] }>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store.dispatch(
      getUserById({ userId: this.route.snapshot.paramMap.get('id')! })
    );
  }
}
