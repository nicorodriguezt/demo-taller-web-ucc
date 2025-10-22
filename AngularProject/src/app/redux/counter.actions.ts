import { createAction, props } from '@ngrx/store';

export const increment = createAction('[Counter] Increment');
export const decrement = createAction('[Counter] Decrement');
export const reset = createAction('[Counter] Reset');
export const resetFailure = createAction(
  '[Counter API] Reset Failure',
  props<{ error: string }>()
);
export const resetSuccess = createAction(
  '[Counter API] Reset Success'
);
