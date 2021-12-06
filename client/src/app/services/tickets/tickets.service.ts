import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from 'src/app/models/ticket.model';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  private ticketsUrl = 'http://localhost:3001/projects';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.ticketsUrl, ticket, this.httpOptions);
  }

  getTicketById(id: string): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.ticketsUrl}/${id}`);
  }

  updateTicket(id: string, update: Partial<Ticket>): Observable<Ticket> {
    return this.http.patch<Ticket>(
      `${this.ticketsUrl}/${id}`,
      update,
      this.httpOptions
    );
  }

  deleteTicket(id: string): Observable<Ticket> {
    return this.http.delete<Ticket>(
      `${this.ticketsUrl}/${id}`,
      this.httpOptions
    );
  }
}
