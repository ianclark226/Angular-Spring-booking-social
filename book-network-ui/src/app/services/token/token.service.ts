import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  get token(): string | null {
    return localStorage.getItem('access_token');
  }

  set token(value: string | null) {
    if (value) {
      localStorage.setItem('access_token', value);
    } else {
      localStorage.removeItem('access_token');
    }
  }

  isTokenNotValid() {
    return !this.isTokenValid();
    }

  private isTokenValid() {
    const token = this.token;
    if(!token) {
      return false

    }
  const jwtHelper = new JwtHelperService();
  const isTokenExpired = jwtHelper.isTokenExpired(token)
  if(isTokenExpired) {
    localStorage.clear()
    return false
    }
  return true
}
}
