export interface Ticket {
  _id?: string;
  name: string;
  description: string;
  status: string;
  priority: string;
  type: string;
  dateCreated: string;
  dateClosed: string | null;
  project: any;
  author: any;
  assignedTo: Array<any>;
  modifications: Array<any>;
}
