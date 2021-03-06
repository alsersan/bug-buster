import { createAction, props } from '@ngrx/store';
import {
  DeletedProject,
  NewProject,
  Project,
} from 'src/app/models/project.model';

// CREATE PROJECT
export const createProject = createAction(
  '[Projects] Create project',
  props<{ project: NewProject }>()
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
export const getAllProjects = createAction('[Projects] Get all projects');
export const getAllProjectsSucess = createAction(
  '[Projects] Get all projects success',
  props<{ projects: Project[] }>()
);
export const getAllProjectsFailure = createAction(
  '[Projects] Get all projects failure',
  props<{ error: any }>()
);

// GET PROJECTS BY ID
export const getProjectById = createAction(
  '[Projects] Get project by id',
  props<{ projectId: string }>()
);
export const getProjectByIdSuccess = createAction(
  '[Projects] Get project by id success',
  props<{ project: Project }>()
);
export const getProjectByIdFailure = createAction(
  '[Projects] Get project by id failure',
  props<{ error: any }>()
);

// UPDATE PROJECT
export const updateProject = createAction(
  '[Projects] Update project',
  props<{ projectId: string; update: Partial<Project> }>()
);
export const updateProjectSuccess = createAction(
  '[Projects] Update project sucess',
  props<{ project: Project }>()
);
export const updateProjectFailure = createAction(
  '[Projects] Update project failure',
  props<{ error: any }>()
);

// DELETE PROJECT
export const deleteProject = createAction(
  '[Projects] Delete project',
  props<{ projectId: string }>()
);
export const deleteProjectSuccess = createAction(
  '[Projects] Delete project success',
  props<{ project: DeletedProject }>()
);
export const deleteProjectFailure = createAction(
  '[Projects] Delete project failure',
  props<{ error: any }>()
);
