import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Modification } from 'src/app/models/modification.model';

@Injectable({
  providedIn: 'root',
})
export class ModificationsService {
  private modificationsUrl = 'http://localhost:3001/modifications';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  createModification(modification: Modification): Observable<Modification> {
    return this.http.post<Modification>(
      this.modificationsUrl,
      modification,
      this.httpOptions
    );
  }
}
