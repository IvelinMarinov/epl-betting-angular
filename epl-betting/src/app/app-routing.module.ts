import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ClubStandingsComponent } from './components/standings/club-standings/club-standings.component';
import { ClubStandingsResolver } from './core/resolvers/club-standings.resolver';
import { BetStandingsComponent } from './components/standings/bet-standings/bet-standings.component';
import { BetStandingsResolver } from './core/resolvers/bet-standings.resolver';
import { SetupRoundComponent } from './components/admin/setup-round/setup-round.component';
import { CompleteRoundComponent } from './components/admin/complete-round/complete-round.component';
import { PlaceBetsComponent } from './components/bets/place-bets/place-bets.component';
import { BetsResolver } from './core/resolvers/bets.resolver';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { LoggedInGuard } from './core/guards/logged-in.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: "register", component: RegisterComponent, canActivate: [LoggedInGuard] },
  { path: "login", component: LoginComponent, canActivate: [LoggedInGuard] },
  { path: "logout", component: LogoutComponent },
  { 
    path: "admin/setup-round", 
    component: SetupRoundComponent ,
    canActivate: [AdminGuard]
  },
  { 
    path: "admin/complete-round", 
    component: CompleteRoundComponent,
    canActivate: [AdminGuard]
  }, 
  {
    path: "standings/premier-league",
    component: ClubStandingsComponent,
    resolve: { standings: ClubStandingsResolver }
  },
  {
    path: "standings/betting",
    component: BetStandingsComponent,
    resolve: { standings: BetStandingsResolver }
  },
  {
    path: "bet",
    component: PlaceBetsComponent,
    canActivate: [AuthGuard], 
    resolve: { fixture: BetsResolver}
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
