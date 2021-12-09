import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

// CHECK LOGIN
export const checkLogin = createAction('[Login] Check login');
export const checkLoginSuccess = createAction(
  '[Login] Check login success',
  props<{ loguedInUser: User }>()
);

// LOGOUT
export const logout = createAction('[Logout] Logout user');
export const logoutSuccess = createAction('[Logout] Logout user success');
