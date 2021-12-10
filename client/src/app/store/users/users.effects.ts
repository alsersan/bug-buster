import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NEVER, of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users/users.service';
import * as actions from './users.actions';

@Injectable()
export class ProjectsEffects {
  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private store: Store<{ users: User[] }>,
    private router: Router
  ) {}

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.createUser),
      exhaustMap((action) =>
        this.usersService.createUser(action.user).pipe(
          map((user) => {
            this.router.navigateByUrl('/users');
            return actions.createUserSuccess({ user });
          }),
          catchError((error: any) => of(actions.createUserFailure(error)))
        )
      )
    )
  );

  getAllUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getAllUsers),
      exhaustMap(() =>
        this.usersService.getAllUsers().pipe(
          map((users) => actions.getAllUsersSucess({ users })),
          catchError((error: any) => of(actions.getAllUsersFailure(error)))
        )
      )
    )
  );

  getUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getUserById),
      concatLatestFrom(() => {
        return this.store.select('users');
      }),
      exhaustMap(([action, users]) => {
        const exists = users.some((el: User) => el._id === action.userId);
        if (exists) {
          return NEVER;
        } else {
          return this.usersService.getUserById(action.userId).pipe(
            map((user) => {
              return actions.getUserByIdSuccess({ user });
            }),
            catchError((error: any) => of(actions.getUserByIdFailure(error)))
          );
        }
      })
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.updateUser),
      exhaustMap((action) =>
        this.usersService.updateUser(action.userId, action.update).pipe(
          map((user) => actions.updateUserSuccess({ user })),
          catchError((error: any) => of(actions.updateUserFailure(error)))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.deleteUser),
      exhaustMap((action) =>
        this.usersService.deleteUser(action.userId).pipe(
          map((user) => actions.deleteUserSuccess({ user })),
          catchError((error: any) => of(actions.deleteUserFailure(error)))
        )
      )
    )
  );
}
