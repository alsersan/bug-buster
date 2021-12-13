import { ActionReducer, createReducer, on } from '@ngrx/store';
import { User, UserState } from 'src/app/models/user.model';
import * as actions from './auth.actions';

const initialState: UserState = {
  user: {} as User,
  loginFailed: false,
};

export const authReducer = createReducer(
  initialState,

  // LOGIN SUCCESS
  on(actions.loginSuccess, (state, { loguedInUser }) => ({
    ...state,
    user: loguedInUser,
  })),

  // LOGIN FAILURE
  on(actions.loginFailure, (state, { error }) => ({
    ...state,
    loginFailed: true,
  })),

  // LOGOUT
  on(actions.logoutSuccess, (state) => ({
    user: {} as User,
    loginFailed: false,
  }))
);

export function clearState(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    if (action.type === actions.LOGOUT_SUCCESS) {
      state = undefined;
    }
    return reducer(state, action);
  };
}
