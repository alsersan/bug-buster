import { Ticket } from './ticket.model';
import { User } from './user.model';

export interface Project {
  _id?: string;
  name: string;
  description: string;
  status: string;
  dateCreated: string;
  dateClosed: string | null;
  tickets: Array<Ticket>;
  members: {
    projectManager: User;
    developers?: Array<User>;
    qualityAssurance?: Array<User>;
  };
}

export interface NewProject {
  name: string;
  description: string;
  dateCreated: string;
  members: {
    projectManager: string;
  };
}

export interface DeletedProject {
  deletedProjectId: string;
}
