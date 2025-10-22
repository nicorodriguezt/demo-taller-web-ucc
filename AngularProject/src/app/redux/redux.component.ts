// src/app/app.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { increment, decrement, reset } from './counter.actions';
import { selectCounter, selectError, selectLoading } from './counter.reducer';

@Component({
  selector: 'app-redux-component',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section style="text-align:center; display:grid; gap:12px; margin-top:40px">
      <h2>Counter: {{ counter() }}</h2>
      <h2>Error: {{ error() || 'No Error' }}</h2>
      <h2>Loading: {{ loading().toString() }}</h2>

      <div style="display:flex; gap:8px; justify-content:center">
        <button (click)="inc()">+</button>
        <button (click)="dec()">-</button>
        <button (click)="reset()">Reset</button>
      </div>

      <small style="opacity:.7">
        Open Redux DevTools to see actions/state (time travel!)
      </small>
    </section>
  `,
})
export class ReduxComponent {
  private store = inject(Store<{ counter: number }>);
  counter = this.store.selectSignal(selectCounter);
  loading = this.store.selectSignal(selectLoading);
  error   = this.store.selectSignal(selectError);

  inc()   { this.store.dispatch(increment()); }
  dec()   { this.store.dispatch(decrement()); }
  reset() { this.store.dispatch(reset()); }
}