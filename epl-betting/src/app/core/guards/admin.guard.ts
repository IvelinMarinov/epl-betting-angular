import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { HeaderService } from '../services/header.service';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate, OnDestroy {
  private isAdmin :boolean;
  private subscription :Subscription;

  constructor(private authService: HeaderService, private router: Router) {
    this.subscription = this.authService.isAdmin$
      .subscribe(data => this.isAdmin = data);
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkIfAdmin();
  }

  checkIfAdmin(): boolean {
    if (this.isAdmin) { 
      return true; 
    }

    this.router.navigate(['/login']);
    return false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}