import { createAction, props } from '@ngrx/store';
import { Comment, newComment } from 'src/app/models/comment.model';

// CREATE COMMENT
export const createComment = createAction(
  '[Comments] Create comment',
  props<{ comment: newComment }>()
);
export const createCommentSuccess = createAction(
  '[Comments] Create comment success',
  props<{ comment: Comment }>()
);
export const createCommentFailure = createAction(
  '[Comments] Create comment failure',
  props<{ error: any }>()
);
