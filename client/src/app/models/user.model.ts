import { Project } from './project.model';
import { Ticket } from './ticket.model';

export interface User {
  _id?: string;
  name: string;
  surname: string;
  avatarUrl: string;
  role: string;
  seniority: string;
  email: string;
  password: string;
  projects: Array<Project>;
  tickets: Array<Ticket>;
}

export interface newUser {
  name: string;
  surname: string;
  avatarUrl: string;
  role: string;
  seniority: string;
  email: string;
  password: string;
}

export interface DeletedUser {
  deletedUserId: string;
}
