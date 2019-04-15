import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderService } from '../services/header.service';

@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate, OnDestroy {
  private isLoggedIn :boolean;
  private subscription :Subscription;

  constructor(private authService: HeaderService, private router: Router) {
    this.subscription = this.authService.isLoggedIn$
      .subscribe(data => this.isLoggedIn = data);
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLogin();
  }

  checkLogin(): boolean {
    if (this.isLoggedIn) { 
      return true; 
    }

    this.router.navigate(['/login']);
    return false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}