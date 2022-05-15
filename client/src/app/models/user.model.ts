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
  password?: string;
  projects: Array<Project>;
  tickets: Array<Ticket>;
  dateRegistered: Date;
}

export interface NewUser {
  name: string;
  surname: string;
  avatarUrl: string;
  role: string;
  seniority: string;
  email: string;
  password: string;
  dateRegistered: Date;
}

export interface DeletedUser {
  deletedUserId: string;
}

export interface UserState {
  user: User;
  loginFailed: boolean;
}

export interface PasswordUpdate {
  currentPassword: string;
  newPassword: string;
}
