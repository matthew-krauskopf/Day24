import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { loginSuccessful } from '@day24/auth-lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import {
  deleteAmiibo,
  loadAmiibo,
  loadAmiibosFail,
  loadAmiibosSuccess,
} from './amiibo.actions';
import { Amiibo } from './amiibo.entity';
import { AmiiboService } from './amiibo.service';

@Injectable()
export class AmiiboEffects {
  amiibosService: AmiiboService = inject(AmiiboService);
  snackbar: MatSnackBar = inject(MatSnackBar);
  router: Router = inject(Router);

  constructor(private actions$: Actions) {}

  loadAmiibo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadAmiibo),
        tap((payload) =>
          this.router.navigate([
            'dashboard',
            'amiibos',
            payload.head + payload.tail,
          ])
        )
      ),
    { dispatch: false }
  );

  loadAmiibos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccessful),
      exhaustMap(() =>
        this.amiibosService.getAmiibos().pipe(
          map((amiibos: Amiibo[]) => loadAmiibosSuccess({ amiibos: amiibos })),
          catchError(() => of(loadAmiibosFail()))
        )
      )
    )
  );

  loadAmiibosFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadAmiibosFail),
        map(() =>
          this.snackbar.open(
            'Network Error: Amiibos failed to load',
            'Dismiss',
            {
              duration: 5000,
            }
          )
        )
      ),
    { dispatch: false }
  );

  //addAmiibo$ = createEffect(
  //  () =>
  //    this.actions$.pipe(
  //      ofType(addAmiibo),
  //      map(() =>
  //        this.snackbar.open('Amiibo successfully created', 'Dismiss', {
  //          duration: 5000,
  //        })
  //      )
  //    ),
  //  { dispatch: false }
  //);

  //updateAmiibo$ = createEffect(
  //  () =>
  //    this.actions$.pipe(
  //      ofType(updateAmiibo),
  //      map(() =>
  //        this.snackbar.open('Amiibo successfully updated', 'Dismiss', {
  //          duration: 5000,
  //        })
  //      )
  //    ),
  //  { dispatch: false }
  //);

  deleteAmiibo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteAmiibo),
        map(() =>
          this.snackbar.open('Amiibo successfully deleted', 'Dismiss', {
            duration: 5000,
          })
        )
      ),
    { dispatch: false }
  );
}
