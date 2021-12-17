import { Ticket } from './ticket.model';
import { User } from './user.model';

export interface Comment {
  _id?: string;
  dateCreated: Date;
  content: string;
  ticket: Ticket;
  author: User;
}

export interface newComment {
  _id?: string;
  dateCreated: Date;
  content: string;
  ticket: string;
  author: string;
}
