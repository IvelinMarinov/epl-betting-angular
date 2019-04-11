import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of as observableOf, BehaviorSubject } from 'rxjs'
import { map, tap, filter } from 'rxjs/operators';

export interface User {
  username: string
  age: number;
}

const ANONIMOUS_USER: User = {
  username: undefined,
  age: undefined
}

@Injectable()
export class AuthService {
  private readonly baseUrl = 'http://localhost:5000/auth';
  private readonly loginUrl = this.baseUrl + '/login';
  private readonly registerUrl = this.baseUrl + '/signup';

  constructor(
    private http: HttpClient
  ) { }

  public subject: BehaviorSubject<User> = new BehaviorSubject<User>(ANONIMOUS_USER);

  public user$: Observable<User> = this.subject
    .asObservable()
    .pipe(filter(user => {
      return !!user
    }));

  public isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => {
    console.log('isLoggedIn$', !!user.username)
    return !!user.username
  }));
  
  register(body) {
    return this.http.post(this.registerUrl, body);
  }

  login(body) {
    return this.http.post<any>(this.loginUrl, body)
      .pipe(
        tap(res => {
          this.subject.next(res.user)
          console.log('login ', this.subject)
        })

      );
  }

  logout() {
    this.subject.next(ANONIMOUS_USER);
    localStorage.clear();
    console.log('logged out ', this.subject)
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated(): Observable<boolean> {
    return observableOf(localStorage.getItem('token') !== null);
  }

  getUsername() {
    return localStorage.getItem('username');
  }
}