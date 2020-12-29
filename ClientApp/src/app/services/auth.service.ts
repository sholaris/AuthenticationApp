import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService) { }

  registerUser(user) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post('http://localhost:5000/users/register', user, httpOptions)
  }

  authenticateUser(user) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post('http://localhost:5000/users/authenticate', user, httpOptions)
  }

  getProfile() {
    this.loadToken();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authToken
      })
    }

    return this.http.get('http://localhost:5000/users/profile', httpOptions)
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logOut() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return !this.jwtHelper.isTokenExpired();
  }
}
