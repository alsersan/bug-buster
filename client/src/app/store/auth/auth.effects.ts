import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NEVER, of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users/users.service';
import * as actions from './auth.actions';

@Injectable()
export class LoginEffects {
  constructor(private actions$: Actions, private usersService: UsersService) {}

  checkLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.checkLogin),
      exhaustMap(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        console.log(jwtToken);
        if (jwtToken) {
          return this.usersService.getUserWithToken().pipe(
            map((loguedInUser) => {
              console.log(loguedInUser);
              return actions.checkLoginSuccess({ loguedInUser });
            })
          );
        } else {
          return NEVER;
        }
      })
    )
  );
}
