import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Login } from 'src/app/models/login.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = `${environment.baseUrl}/login`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<Login> {
    return this.http.post<Login>(
      this.loginUrl,
      { email, password },
      this.httpOptions
    );
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
  }
}
