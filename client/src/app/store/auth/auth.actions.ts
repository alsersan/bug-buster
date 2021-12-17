import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

// CHECK LOGIN
export const checkLogin = createAction('[Login] Check login');

//LOGIN
export const login = createAction(
  '[Login] Login user',
  props<{ email: string; password: string }>()
);
export const loginSuccess = createAction(
  '[Login] Login user success',
  props<{ loguedInUser: User }>()
);
export const loginFailure = createAction(
  '[Login] Login user failure',
  props<{ error: any }>()
);

// LOGOUT
export const LOGOUT_SUCCESS = '[Logout] Logout user success';
export const logout = createAction('[Logout] Logout user');
export const logoutSuccess = createAction(LOGOUT_SUCCESS);
