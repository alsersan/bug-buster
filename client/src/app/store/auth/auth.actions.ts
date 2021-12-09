import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

// CHECK LOGIN
export const checkLogin = createAction('[Login] Check login');
export const checkLoginSuccess = createAction(
  '[Login] Check login success',
  props<{ loguedInUser: User }>()
);
