import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersUrl = 'http://localhost:3001/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, this.httpOptions);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/${id}`);
  }

  updateUser(id: string, update: Partial<User>): Observable<User> {
    return this.http.patch<User>(
      `${this.usersUrl}/${id}`,
      update,
      this.httpOptions
    );
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.usersUrl}/${id}`, this.httpOptions);
  }
}
