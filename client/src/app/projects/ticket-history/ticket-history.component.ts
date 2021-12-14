import { Component, Input, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket.model';

@Component({
  selector: 'app-ticket-history',
  templateUrl: './ticket-history.component.html',
  styleUrls: ['./ticket-history.component.scss'],
})
export class TicketHistoryComponent implements OnInit {
  @Input() ticket!: Ticket;

  constructor() {}

  ngOnInit(): void {}
}
