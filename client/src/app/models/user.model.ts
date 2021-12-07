export interface User {
  _id?: string;
  name: string;
  surname: string;
  avatarUrl: string;
  role: string;
  seniority: string;
  email: string;
  password: string;
  projects: Array<any>;
  tickets: Array<any>;
}
