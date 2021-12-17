import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import * as actions from './users.actions';

const initialState: ReadonlyArray<User> = [];

export const usersReducer = createReducer(
  initialState,

  // CREATE USER
  on(actions.createUserSuccess, (state, { user }) => [...state, user]),

  // GET USERS
  on(actions.getAllUsersSucess, (state, { users }) => [...users]),

  // GET USER BY ID
  on(actions.getUserByIdSuccess, (state, { user }) => [...state, user]),

  // DELETE USER
  on(actions.deleteUserSuccess, (state, { user }) =>
    state.filter((el) => el._id !== user.deletedUserId)
  )
);
