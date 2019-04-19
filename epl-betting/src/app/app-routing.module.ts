import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ClubStandingsComponent } from './components/standings/club-standings/club-standings.component';
import { BetStandingsComponent } from './components/standings/bet-standings/bet-standings.component';
import { SetupRoundComponent } from './components/admin/setup-round/setup-round.component';
import { PlaceBetsComponent } from './components/bets/place-bets/place-bets.component';
import { CompleteRoundComponent } from './components/admin/complete-round/complete-round.component';

import { ClubStandingsResolver } from './core/resolvers/club-standings.resolver';
import { BetStandingsResolver } from './core/resolvers/bet-standings.resolver';
import { BetsResolver } from './core/resolvers/bets.resolver';

import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { AnonymousGuard } from './core/guards/anonymous.guard';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';

const routes: Routes = [
  { 
    path: '',
    pathMatch: 'full', 
    redirectTo: 'home' 
  },
  { 
    path: 'home', 
    component: HomeComponent },
  { 
    path: 'logout', 
    component: LogoutComponent 
  },
  { 
    path: 'register', 
    component: RegisterComponent,
    canActivate: [AnonymousGuard],
  },
  { 
    path: 'login', 
    component: LoginComponent, 
    canActivate: [AnonymousGuard],
  },
  { 
    path: 'admin/setup-round', 
    component: SetupRoundComponent ,
    canActivate: [AdminGuard]
  },
  { 
    path: 'admin/complete-round', 
    component: CompleteRoundComponent,
    canActivate: [AdminGuard]
  }, 
  {
    path: 'standings/premier-league',
    component: ClubStandingsComponent,
    resolve: { standings: ClubStandingsResolver }
  },
  {
    path: 'standings/betting',
    component: BetStandingsComponent,
    resolve: { standings: BetStandingsResolver }
  },
  {
    path: 'bet',
    component: PlaceBetsComponent,
    canActivate: [AuthGuard], 
    resolve: { fixture: BetsResolver}
  },
  {
    path: '**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }