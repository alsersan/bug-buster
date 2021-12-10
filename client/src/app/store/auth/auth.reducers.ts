import { ActionReducer, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import * as actions from './auth.actions';

const initialState: User = {} as User;

export const authReducer = createReducer(
  initialState,

  // LOGIN
  on(actions.loginSuccess, (state, { loguedInUser }) => loguedInUser),

  // LOGOUT
  on(actions.logoutSuccess, (state) => ({} as User))
);

export function clearState(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    if (action.type === actions.LOGOUT_SUCCESS) {
      state = undefined;
    }
    return reducer(state, action);
  };
}
