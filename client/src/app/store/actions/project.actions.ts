import { createAction, props } from '@ngrx/store';
import { Project } from 'src/app/models/project.model';

// CREATE PROJECT
export const createProject = createAction(
  '[Projects] Create project',
  props<{ project: Project }>()
);
export const createProjectSuccess = createAction(
  '[Projects] Create project success',
  props<{ project: Project }>()
);
export const createProjectFailure = createAction(
  '[Projects] Create project failure',
  props<{ error: any }>()
);

// GET ALL PROJECTS
export const getAllprojects = createAction('[Projects] Get all projects');
export const getAllprojectsSucess = createAction(
  '[Projects] Get all projects success',
  props<{ projects: Project[] }>()
);
export const getAllprojectsFailure = createAction(
  '[Projects] Get all projects failure',
  props<{ error: any }>()
);

// GET PROJECTS BY ID
export const getProjectById = createAction(
  '[Projects] Get all projects',
  props<{ projectId: string }>()
);
export const getProjectByIdSuccess = createAction(
  '[Projects] Get all projects',
  props<{ project: Project }>()
);
export const getProjectByIdFailure = createAction(
  '[Projects] Get all projects',
  props<{ error: any }>()
);

// UPDATE PROJECT
export const updateProject = createAction(
  '[Projects] Update Project',
  props<{ projectId: string; update: Partial<Project> }>()
);
export const updateProjectSuccess = createAction(
  '[Projects] Update Project sucess',
  props<{ project: Project }>()
);
export const updateProjectFailure = createAction(
  '[Projects] Update Project',
  props<{ error: any }>()
);

// DELETE PROJECT
export const deleteProject = createAction(
  '[Projects] Delete Project',
  props<{ projectId: string }>()
);
export const deleteProjectSuccess = createAction(
  '[Projects] Delete Project',
  props<{ project: any }>()
);
export const deleteProjectFailure = createAction(
  '[Projects] Delete Project',
  props<{ error: any }>()
);
