import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NEVER, of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';
import * as actions from './auth.actions';

@Injectable()
export class LoginEffects {
  constructor(
    private router: Router,
    private actions$: Actions,
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  checkLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.checkLogin),
      exhaustMap(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
          return this.usersService
            .getUserWithToken()
            .pipe(
              map((loguedInUser) => actions.loginSuccess({ loguedInUser }))
            );
        } else {
          this.router.navigateByUrl('/login');
          return NEVER;
        }
      })
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.login),
      exhaustMap((action) =>
        this.authService.login(action.email, action.password).pipe(
          exhaustMap(({ jwtToken }) => {
            localStorage.setItem('jwtToken', jwtToken);
            return this.usersService.getUserWithToken().pipe(
              map((loguedInUser) => {
                this.router.navigateByUrl('/dashboard');
                return actions.loginSuccess({ loguedInUser });
              })
            );
          }),
          catchError((error: any) => of(actions.loginFailure(error)))
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.logout),
      exhaustMap(() =>
        of(this.authService.logout()).pipe(
          map(() => {
            this.router.navigateByUrl('/login');
            return actions.logoutSuccess();
          })
        )
      )
    )
  );
}
