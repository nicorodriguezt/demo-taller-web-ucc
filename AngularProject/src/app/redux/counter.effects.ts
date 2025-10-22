// src/app/state/counter.effects.ts
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { increment, decrement, reset, resetFailure, resetSuccess } from './counter.actions';
import { tap, delay, mergeMap, catchError, map } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

/**
 * Ejemplo de Effects que solo loguean para demostración en clase.
 * - Los Effects escuchan acciones que pasan por el store.
 * - No modifican el estado directamente, sino que pueden despachar nuevas acciones.
 */

export const logIncrementEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    return actions$.pipe(
      ofType(increment),
      tap(() => console.log('🟢 [Effect] Increment fue despachado'))
    );
  },
  { functional: true, dispatch: false } // no emite nuevas acciones
);

export const logDecrementEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    return actions$.pipe(
      ofType(decrement),
      tap(() => console.log('🔵 [Effect] Decrement fue despachado'))
    );
  },
  { functional: true, dispatch: false }
);

// Este effect simula una tarea asincrónica o side effect adicional

export const delayedResetEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    return actions$.pipe(
      ofType(reset),
      tap(() => console.log('🟠 [Effect] Reset iniciado...')),
      delay(500), // simula una operación async
      map(() => {
        console.log('✅ [Effect] Reset completado, despachando resetSuccess');
        return resetSuccess(); // 👈 esta acción se despacha al store
      })
    );
  },
  { functional: true } // 👈 por defecto dispatch: true
);

/*export const alwaysFailEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    return actions$.pipe(
      ofType(reset),
      mergeMap(() =>
        // Simulated backend call that always fails
        throwError(() => new Error('Simulated backend error')).pipe(
          catchError((err) => {
            console.error('❌ [Effect] Backend failed:', err.message);
            return of(resetFailure({ error: err.message }));
          })
        )
      )
    );
  },
  { functional: true }
);

*/