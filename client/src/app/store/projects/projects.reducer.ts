import { createReducer, on } from '@ngrx/store';
import { Project } from 'src/app/models/project.model';
import * as actions from './projects.actions';
import * as ticketActions from '../tickets/tickets.actions';

const initialState: ReadonlyArray<Project> = [];

export const projectsReducer = createReducer(
  initialState,

  // CREATE PROJECT
  on(actions.createProjectSuccess, (state, { project }) => [...state, project]),

  // GET PROJECTS
  on(actions.getAllProjectsSucess, (state, { projects }) => [...projects]),

  // GET PROJECTS BY ID
  on(actions.getProjectByIdSuccess, (state, { project }) => [
    ...state,
    project,
  ]),

  // UPDATE PROJECT

  on(actions.updateProjectSuccess, (state, { project }) =>
    state.map((el) => (el._id === project._id ? project : el))
  ),

  // DELETE PROJECT
  on(actions.deleteProjectSuccess, (state, { project }) =>
    state.filter((el) => el._id !== project.deletedProjectId)
  ),

  // CREATE TICKET
  on(ticketActions.createTicketSuccess, (state, { ticket }) => {
    console.log('REDUCER', ticket);
    const project = { ...state.find((el) => el._id === ticket.project._id)! };
    project.tickets = [ticket, ...project.tickets];
    return state.map((el) => (el._id === ticket.project._id ? project : el));
  })
);
