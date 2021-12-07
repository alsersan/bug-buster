export interface Project {
  _id?: string;
  name: string;
  description: string;
  status: string;
  dateCreated: string;
  dateClosed: string | null;
  tickets: Array<any>;
  members?: {
    projectManager: any;
    developers: Array<any>;
    qualityAssurance: Array<any>;
  };
}
