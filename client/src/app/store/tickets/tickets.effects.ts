import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { TicketsService } from 'src/app/services/tickets/tickets.service';
import * as actions from './tickets.actions';

@Injectable()
export class TicketsEffects {
  constructor(
    private actions$: Actions,
    private ticketsService: TicketsService
  ) {}

  createTicket$ = createEffect(() =>
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

  updateTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.updateTicket),
      exhaustMap((action) =>
        this.ticketsService.updateTicket(action.ticketId, action.update).pipe(
          map((ticket) => actions.updateTicketSuccess({ ticket })),
          catchError((error: any) => of(actions.updateTicketFailure(error)))
        )
      )
    )
  );
}
