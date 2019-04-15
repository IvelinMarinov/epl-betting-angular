import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderService } from '../services/header.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate, OnDestroy {
    private isLoggedIn: boolean;
    private subscription: Subscription;
  
    constructor(private authService: AuthService, private router: Router) {
      // this.subscription = this.authService.isLoggedIn$
      //   .subscribe(data => this.isLoggedIn = data);
    }
  
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      return this.checkAnonymous();
    }
  
    checkAnonymous(): boolean {
      console.log(this.isLoggedIn)
      if (this.authService.isLoggedIn()) { 
        this.router.navigate(['/home']);
        return false;
      }
      
      return true; 
    }
  
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
  }