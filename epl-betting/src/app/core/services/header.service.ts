import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/components/shared/models/User';

const ANONIMOUS_USER: User = {
  username: undefined,
  roles: []
}

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor() { }

  public subject: BehaviorSubject<User> = new BehaviorSubject<User>(ANONIMOUS_USER);

  public user$: Observable<User> = this.subject
    .asObservable();

  public isLoggedIn$: Observable<boolean> = this.user$
    .pipe(map(user =>  !!user.username));

  public isAdmin$: Observable<boolean> = this.user$
    .pipe(map(user => user.roles.includes('Admin')));

  public username$: Observable<string> = this.user$
    .pipe(map(user => user.username));

  public signInUser(user: User) :void {
    this.subject.next(user)
  }

  public signOutUser() :void {
    console.log('sign-out')
    this.subject.next(ANONIMOUS_USER);
  }
}
