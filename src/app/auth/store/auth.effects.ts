import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { switchMap, map, catchError, tap, mergeMap } from 'rxjs/operators';

import { User } from '../user.model';
import { AuthService } from '../auth.service';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (resData: AuthResponseData) => {
  const expirationDate = new Date(
    new Date().getTime() + +resData.expiresIn * 1000
  );

  const user = new User(
    resData.email,
    resData.localId,
    resData.idToken,
    expirationDate
  );
  localStorage.setItem('userData', JSON.stringify(user));

  return new AuthActions.AuthenticateSuccess({
    email: resData.email,
    userId: resData.localId,
    token: resData.idToken,
    expirationDate, 
    redirect: true
  });
};

const handleError = errorRes => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'The email does not exist!';
      break;
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct';
      break;
  }
  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    mergeMap((authData: AuthActions.SignupStart) => {
      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDkhMt5gB_HaZF9zGjbDxnsi0hXink5grc',
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          }
        )
        .pipe(
          map(resData => handleAuthentication(resData)),
          catchError(errorRes => handleError(errorRes))
        );
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDkhMt5gB_HaZF9zGjbDxnsi0hXink5grc',
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          }
        )
        .pipe(
          tap(resData => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map(resData => handleAuthentication(resData)),
          catchError(errorRes => handleError(errorRes))
        );
    })
  );

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
      if (authSuccessAction.payload.redirect) {
        this.router.navigate(['/']);
      }
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
      this.authService.clearLogoutTimer();
    })
  );

  @Effect()
  authAutoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (userData) {
        const expirationDuration =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.authService.setLogoutTimer(expirationDuration);

        return new AuthActions.AuthenticateSuccess({
          email: userData.email,
          userId: userData.id,
          token: userData._token,
          expirationDate: userData._tokenExpirationDate, 
          redirect: false
        });
      }
      return { type: 'DUMMY' };
    })
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
