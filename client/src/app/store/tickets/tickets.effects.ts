import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NEVER, of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { Project } from 'src/app/models/project.model';
import { ProjectsService } from 'src/app/services/projects/projects.service';
import { TicketsService } from 'src/app/services/tickets/tickets.service';
import * as actions from './tickets.actions';

@Injectable()
export class TicketsEffects {
  constructor(
    private actions$: Actions,
    private ticketsService: TicketsService,
    private store: Store<{ projects: Project[] }>,
    private router: Router
  ) {}

  createProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.createTicket),
      exhaustMap((action) =>
        this.ticketsService.createTicket(action.ticket).pipe(
          map((ticket) => actions.createTicketSuccess({ ticket })),
          catchError((error: any) => of(actions.createTicketFailure(error)))
        )
      )
    )
  );
}
