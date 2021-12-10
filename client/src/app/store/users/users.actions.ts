import { createAction, props } from '@ngrx/store';
import { DeletedUser, newUser, User } from 'src/app/models/user.model';

// CREATE USER
export const createUser = createAction(
  '[Users] Create user',
  props<{ user: newUser }>()
);
export const createUserSuccess = createAction(
  '[Users] Create user success',
  props<{ user: User }>()
);
export const createUserFailure = createAction(
  '[Users] Create user failure',
  props<{ error: any }>()
);

// GET ALL USERS
export const getAllUsers = createAction('[Users] Get all users');
export const getAllUsersSucess = createAction(
  '[Users] Get all users success',
  props<{ users: User[] }>()
);
export const getAllUsersFailure = createAction(
  '[Users] Get all users failure',
  props<{ error: any }>()
);

// GET USER BY ID
export const getUserById = createAction(
  '[Users] Get user by id',
  props<{ userId: string }>()
);
export const getUserByIdSuccess = createAction(
  '[Users] Get user by id success',
  props<{ user: User }>()
);
export const getUserByIdFailure = createAction(
  '[Users] Get user by id failure',
  props<{ error: any }>()
);

// UPDATE USER
export const updateUser = createAction(
  '[Users] Update user',
  props<{ userId: string; update: Partial<User> }>()
);
export const updateUserSuccess = createAction(
  '[Users] Update user sucess',
  props<{ user: User }>()
);
export const updateUserFailure = createAction(
  '[Users] Update user failure',
  props<{ error: any }>()
);

// DELETE USER
export const deleteUser = createAction(
  '[Users] Delete user',
  props<{ userId: string }>()
);
export const deleteUserSuccess = createAction(
  '[Users] Delete user success',
  props<{ user: DeletedUser }>()
);
export const deleteUserFailure = createAction(
  '[Users] Delete user failure',
  props<{ error: any }>()
);
