import { createAction, props } from '@ngrx/store';
import { NewTicket, Ticket } from 'src/app/models/ticket.model';

// CREATE TICKET
export const createTicket = createAction(
  '[Tickets] Create ticket',
  props<{ ticket: NewTicket }>()
);
export const createTicketSuccess = createAction(
  '[Tickets] Create ticket success',
  props<{ ticket: Ticket }>()
);
export const createTicketFailure = createAction(
  '[Tickets] Create ticket failure',
  props<{ error: any }>()
);
