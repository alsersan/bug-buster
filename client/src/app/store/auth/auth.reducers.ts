import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import * as actions from './auth.actions';

const initialState: User = {} as User;

export const loginReducer = createReducer(
  initialState,

  // CHECK LOGIN
  on(actions.checkLoginSuccess, (state, { loguedInUser }) => loguedInUser)

  /* on(actions.getAllprojectsSucess, (state, { projects }) => [...projects]),


  on(actions.getProjectByIdSuccess, (state, { project }) => [
    ...state,
    project,
  ]),


  on(actions.deleteProjectSuccess, (state, { project }) =>
    state.filter((el) => el._id !== project.deletedProjectId)
  ) */
);
