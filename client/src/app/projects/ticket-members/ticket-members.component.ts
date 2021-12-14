import { Component, OnInit } from '@angular/core';
import { capitalizedRoles } from 'src/app/utils/roles';

@Component({
  selector: 'app-ticket-members',
  templateUrl: './ticket-members.component.html',
  styleUrls: ['./ticket-members.component.scss'],
})
export class TicketMembersComponent implements OnInit {
  roles = capitalizedRoles;
  members = [
    {
      name: 'Patato',
      surname: 'Man',
      role: 'developer',
      seniority: 'junior',
    },
    {
      name: 'Patato',
      surname: 'Man',
      role: 'developer',
      seniority: 'junior',
    },
    {
      name: 'Patato',
      surname: 'Man',
      role: 'developer',
      seniority: 'junior',
    },
    {
      name: 'Patato',
      surname: 'Man',
      role: 'developer',
      seniority: 'junior',
    },
    {
      name: 'Patato',
      surname: 'Man',
      role: 'developer',
      seniority: 'junior',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
