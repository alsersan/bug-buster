import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersUrl = `${environment.baseUrl}/users`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, this.httpOptions);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/${userId}`);
  }

  getUserWithToken(): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/token`);
  }

  updateUser(userId: string, update: Partial<User>): Observable<User> {
    return this.http.patch<User>(
      `${this.usersUrl}/${userId}`,
      update,
      this.httpOptions
    );
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<User>(
      `${this.usersUrl}/${userId}`,
      this.httpOptions
    );
  }
}
