import { User } from './user.model';
import { Ticket } from './ticket.model';

export interface Modification {
  _id?: string;
  modifiedProperty: string;
  oldValue: string;
  newValue: string;
  dateCreated: Date;
  author: User;
  ticket: Ticket;
}
