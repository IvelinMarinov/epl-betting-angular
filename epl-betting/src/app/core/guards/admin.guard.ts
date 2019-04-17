import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderService } from '../services/header.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkIfAdmin();
  }

  checkIfAdmin(): boolean {
    if (this.authService.isAdmin()) { 
      return true; 
    }

    this.router.navigate(['/home']);
    return false;
  }
}