import { createFeature, createReducer, on } from '@ngrx/store';
import { increment, decrement, reset, resetFailure, resetSuccess } from './counter.actions';

export const initialState = {
    counter: 0,
    loading: false,
    error: ''
};

export const counterReducer = createReducer(
  initialState,
  on(increment, (state) => ({ ...state, counter: state.counter + 1 })),
  on(decrement, (state) => ({ ...state, counter: state.counter - 1 })),
  on(reset, (state) => ({...state, loading: true}) ),
  on(resetFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(resetSuccess, (state) => ({ ...state, loading: false, counter: 0, error: '' }))
);

export const counterFeature = createFeature({
  name: 'counter',
  reducer: counterReducer,
});

// 👇 Auto-generated selectors (memoized)
export const {
  selectLoading,
  selectCounter,
  selectError,
} = counterFeature;