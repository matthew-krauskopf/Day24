import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { StoreType } from '../../model/enum/storeType';
import { StoreService } from '../../services/store.service';
import {
  login,
  loginFailed,
  loginRejected,
  loginSuccessful,
  logout,
  relogin,
} from './auth.actions';
import { AuthService } from './auth.service';

@Injectable()
export class AuthEffects {
  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);
  localStorage: StoreService = inject(StoreService);
  snackbar: MatSnackBar = inject(MatSnackBar);

  constructor(private actions$: Actions) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      exhaustMap((payload) =>
        this.authService.getUser(payload.username).pipe(
          map((auth) =>
            auth.length > 0 && auth[0].password === payload.password
              ? loginSuccessful({ user: auth[0] })
              : loginRejected()
          ),
          catchError(() => of(loginFailed()))
        )
      )
    )
  );

  relogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(relogin),
      map(() => {
        const username = this.localStorage.getItem(StoreType.USER);
        if (username != null) {
          return login({
            username: username,
            password: this.localStorage.getItem(StoreType.PASSWORD) ?? '',
          });
        } else {
          return logout();
        }
      })
    )
  );

  loginSuccessful$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccessful),
        map((payload) => {
          this.localStorage.storeItem(StoreType.USER, payload.user.username);
          this.localStorage.storeItem(
            StoreType.PASSWORD,
            String(payload.user.password)
          );
          if (this.router.url.includes('login')) {
            this.router.navigate(['dashboard']);
          }
        })
      ),
    { dispatch: false }
  );

  loginFailed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginFailed),
      map(() => {
        this.snackbar.open('Network Error: Please Try Again', 'Dismiss', {
          duration: 5000,
        });
        return logout();
      })
    )
  );

  loginRejected$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginRejected),
        map(() => {
          this.snackbar.open(
            'Login failed. Please check crednetials and try again',
            'Dismiss',
            {
              duration: 2000,
            }
          );
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        map(() => {
          this.localStorage.removeItem(StoreType.USER);
          this.localStorage.removeItem(StoreType.PASSWORD);
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );
}
