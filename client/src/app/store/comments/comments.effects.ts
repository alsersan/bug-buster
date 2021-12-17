import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { CommentsService } from 'src/app/services/comments/comments.service';
import * as actions from './comments.actions';

@Injectable()
export class CommentsEffects {
  constructor(
    private actions$: Actions,
    private commentsService: CommentsService
  ) {}

  createComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.createComment),
      exhaustMap((action) =>
        this.commentsService.createComment(action.comment).pipe(
          map((comment) => actions.createCommentSuccess({ comment })),
          catchError((error: any) => of(actions.createCommentFailure(error)))
        )
      )
    )
  );
}
