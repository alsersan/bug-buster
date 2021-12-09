import { createAction, props } from '@ngrx/store';
import {
  DeletedProject,
  NewProject,
  Project,
} from 'src/app/models/project.model';
import { User } from 'src/app/models/user.model';

// CHECK LOGIN
export const checkLogin = createAction('[Login] Check login');
export const checkLoginSuccess = createAction(
  '[Login] Check login success',
  props<{ loguedInUser: User }>()
);
/* export const createProjectSuccess = createAction(
  '[Projects] Create project success',
  props<{ project: Project }>()
);
export const createProjectFailure = createAction(
  '[Projects] Create project failure',
  props<{ error: any }>()
); */
