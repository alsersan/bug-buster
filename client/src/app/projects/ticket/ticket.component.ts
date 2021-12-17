import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { Project } from 'src/app/models/project.model';
import { Ticket } from 'src/app/models/ticket.model';
import { getProjectById } from 'src/app/store/projects/projects.actions';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit {
  isEditTicketVisible: boolean = false;
  projects$: Observable<Array<Project>> = this.store.select('projects');
  ticket!: Ticket;
  ticket$: Subscription = this.projects$.subscribe(
    /* map(
      (array) =>
        array
          .find((el) => el._id === this.route.snapshot.paramMap.get('id'))
          ?.tickets.find(
            (el) => el._id === this.route.snapshot.paramMap.get('ticketId')
          )!
    ) */
    (array) => {
      this.ticket = array
        .find((el) => el._id === this.route.snapshot.paramMap.get('id'))
        ?.tickets.find(
          (el) => el._id === this.route.snapshot.paramMap.get('ticketId')
        )!;
    }
    /* map(
      (array) =>
        array
          .find((el) => el._id === this.route.snapshot.paramMap.get('id'))
          ?.tickets.find(
            (el) => el._id === this.route.snapshot.paramMap.get('ticketId')
          )!
    ) */
  );

  constructor(
    private store: Store<{ projects: Project[] }>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store.dispatch(
      getProjectById({ projectId: this.route.snapshot.paramMap.get('id')! })
    );
  }

  setEditTicketVisibility(isVisible: boolean) {
    this.isEditTicketVisible = isVisible;
  }
}
