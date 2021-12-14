import { Component, OnInit } from '@angular/core';
import { capitalizedRoles } from 'src/app/utils/roles';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss'],
})
export class TicketDetailsComponent implements OnInit {
  roles = capitalizedRoles;
  ticket = {
    _id: '9834769832649',
    name: 'Test ticket',
    description: 'Test ticket description',
    status: 'active',
    priority: 'high',
    type: 'bug',
    dateCreated: 'today',
    project: 'ProjectId',
    author: {
      name: 'bla',
      surname: 'blublu',
      role: 'quality-assurance',
    },
  };

  constructor() {}

  ngOnInit(): void {}
}
