import { createReducer, on } from '@ngrx/store';
import { Project } from 'src/app/models/project.model';
import * as actions from '../actions/projects.actions';

const initialState: ReadonlyArray<Project> = [];

export const projectsReducer = createReducer(
  initialState,

  // GET PROJECTS
  on(actions.getAllprojectsSucess, (state, { projects }) => [...projects])
);
