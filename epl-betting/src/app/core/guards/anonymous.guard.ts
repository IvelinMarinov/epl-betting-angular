import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AnonymousGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
    }
  
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      return this.checkAnonymous();
    }
  
    checkAnonymous(): boolean {
      if (this.authService.isLoggedIn()) { 
        this.router.navigate(['/home']);
        return false;
      }
      
      return true; 
    }
  }