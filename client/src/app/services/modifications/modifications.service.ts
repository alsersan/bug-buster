import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Modification } from 'src/app/models/modification.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ModificationsService {
  private modificationsUrl = `${environment.baseUrl}/modifications`;

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
