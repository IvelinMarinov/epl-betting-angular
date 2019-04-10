import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
  private readonly baseUrl = 'http://localhost:5000/auth';
  private readonly loginUrl = this.baseUrl + '/login';
  private readonly registerUrl = this.baseUrl + '/signup';

  constructor(
    private http: HttpClient
  ) { }

  register(body) {
    return this.http.post(this.registerUrl, body);
  }

  login(body) {
    return this.http.post(this.loginUrl, body);
  }

  logout() {
    localStorage.clear();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    return this.getToken() !== null;
  }

  getUsername() {
    return localStorage.getItem('username');
  }
}