import { Project } from './project.model';
import { User } from './user.model';

export interface Ticket {
  _id?: string;
  name: string;
  description: string;
  status: string;
  priority: string;
  type: string;
  dateCreated: Date;
  dateClosed: Date | null;
  project: Project;
  author: User;
  assignedTo: Array<User>;
}

export interface NewTicket {
  name: string;
  description: string;
  priority: string;
  type: string;
  dateCreated: Date;
  project: string;
  author: string;
}

export interface DeletedTicket {
  deletedTicketId: string;
}
