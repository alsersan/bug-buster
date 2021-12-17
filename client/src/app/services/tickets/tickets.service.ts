import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeletedTicket, NewTicket, Ticket } from 'src/app/models/ticket.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  private ticketsUrl = `${environment.baseUrl}/tickets`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  createTicket(ticket: NewTicket): Observable<Ticket> {
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

  deleteTicket(ticketId: string): Observable<DeletedTicket> {
    return this.http.delete<DeletedTicket>(
      `${this.ticketsUrl}/${ticketId}`,
      this.httpOptions
    );
  }
}
