import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of as observableOf, BehaviorSubject } from 'rxjs'
import { map, tap, filter } from 'rxjs/operators';
import { HeaderService } from './header.service';

@Injectable()
export class AuthService {
  private readonly baseUrl = 'http://localhost:5000/auth';
  private readonly loginUrl = this.baseUrl + '/login';
  private readonly registerUrl = this.baseUrl + '/signup';

  constructor(
    private http: HttpClient,
    private headerService: HeaderService
  ) { }

  register(body) {
    return this.http.post(this.registerUrl, body);
  }

  login(body) {
    return this.http.post<any>(this.loginUrl, body)
      .pipe(
        tap(res => this.headerService.signInUser(res.user))
      );
  }

  logout() {
    this.headerService.signOutUser();
    localStorage.clear();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return localStorage.getItem('name') !== null;
  }
}