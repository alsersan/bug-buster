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

  getTicketById(ticketId: string): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.ticketsUrl}/${ticketId}`);
  }

  updateTicket(ticketId: string, update: Partial<Ticket>): Observable<Ticket> {
    return this.http.patch<Ticket>(
      `${this.ticketsUrl}/${ticketId}`,
      update,
      this.httpOptions
    );
  }

  deleteTicket(ticketId: string): Observable<any> {
    return this.http.delete<Ticket>(
      `${this.ticketsUrl}/${ticketId}`,
      this.httpOptions
    );
  }
}
