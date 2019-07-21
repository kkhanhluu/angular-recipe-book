import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; 
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs'; 
import { catchError, tap } from 'rxjs/operators'; 

import { User } from './user.model'
export interface AuthResponseData {
  kind: string;
  idToken:	string;
  email:	string;
  refreshToken:	string;
  expiresIn:	string;
  localId: string;
  registered?:	boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any; 

  private SIGNUP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDkhMt5gB_HaZF9zGjbDxnsi0hXink5grc'; 
  private SIGNIN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDkhMt5gB_HaZF9zGjbDxnsi0hXink5grc';
  
  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.SIGNUP_URL, {
      email: email, 
      password: password, 
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError), 
      tap(resData => {
        this.handleAuthentication(resData.email, resData.idToken, +resData.expiresIn, resData.localId); 
      }) 
    ); 
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.SIGNIN_URL, {
      email: email, 
      password: password, 
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError), 
      tap(resData => {
        this.handleAuthentication(resData.email, resData.idToken, +resData.expiresIn, resData.localId); 
      }) 
    );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/recipes']);
    localStorage.removeItem('userData'); 
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer); 
    }
    this.tokenExpirationTimer = null; 
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData')); 
    if (userData) {
      this.user.next(userData);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime(); 
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout(); 
    }, expirationDuration)
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    switch(errorRes.error.error.message) {
      case 'EMAIL_NOT_FOUND': 
        errorMessage = 'The email does not exist!'; 
        break;
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already'; 
        break; 
      case 'INVALID_PASSWORD': 
        errorMessage ='This password is not correct'; 
        break;  
    } 
    return throwError(errorMessage);
  }

  private handleAuthentication(email: string, token: string, expiresIn: number, localId: string) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000); 
      const user = new User(email, localId, token, expirationDate);
      this.user.next(user); 
      this.autoLogout(expiresIn * 1000); 
      localStorage.setItem('userData', JSON.stringify(user));
  }
}