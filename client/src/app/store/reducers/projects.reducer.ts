import { createReducer, on } from '@ngrx/store';
import { Project } from 'src/app/models/project.model';
import * as actions from '../actions/projects.actions';

const initialState: ReadonlyArray<Project> = [];

export const projectsReducer = createReducer(
  initialState,

  // CREATE PROJECT
  on(actions.createProjectSuccess, (state, { project }) => [...state, project]),

  // GET PROJECTS
  on(actions.getAllprojectsSucess, (state, { projects }) => [...projects]),

  // DELETE PROJECT
  on(actions.deleteProject, (state, project) => state.filter((el) => el)),
  on(actions.deleteProjectSuccess, (state, { project }) =>
    state.filter((el) => el._id !== project.deletedProjectId)
  )
);
