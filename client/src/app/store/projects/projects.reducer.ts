// @ts-nocheck
import { createReducer, on } from '@ngrx/store';
import { Project } from 'src/app/models/project.model';
import * as actions from './projects.actions';
import * as ticketActions from '../tickets/tickets.actions';
import * as commentActions from '../comments/comments.actions';

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
    const project = { ...state.find((el) => el._id === ticket.project._id)! };
    project.tickets = [ticket, ...project.tickets];
    return state.map((el) => (el._id === ticket.project._id ? project : el));
  }),

  // UPDATE TICKET
  on(ticketActions.updateTicketSuccess, (state, { ticket }) => {
    const project = { ...state.find((el) => el._id === ticket.project._id)! };
    project.tickets = project.tickets.map((el) =>
      el._id === ticket._id ? ticket : el
    );
    return state.map((el) => (el._id === ticket.project._id ? project : el));
  }),

  // CREATE COMMENT
  on(commentActions.createCommentSuccess, (state, { comment }) => {
    const project = {
      ...state.find((el) =>
        el.tickets.find((i) => i._id === comment.ticket._id)
      ),
    };
    project.tickets = project.tickets!.map((ticket) =>
      ticket._id === comment.ticket._id
        ? { ...ticket, comments: [comment, ...ticket.comments] }
        : ticket
    );
    return state.map((el) => (el._id === project!._id ? project : el));
  })
);
