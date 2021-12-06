import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private projectsUrl = 'http://localhost:3001/projects';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  createProject(hero: Project): Observable<Project> {
    return this.http.post<Project>(this.projectsUrl, hero, this.httpOptions);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl);
  }

  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.projectsUrl}/${id}`);
  }

  updateProject(id: string, update: Partial<Project>): Observable<Project> {
    return this.http.patch<Project>(
      `${this.projectsUrl}/${id}`,
      update,
      this.httpOptions
    );
  }

  deleteProject(id: string): Observable<Project> {
    return this.http.delete<Project>(
      `${this.projectsUrl}/${id}`,
      this.httpOptions
    );
  }
}
