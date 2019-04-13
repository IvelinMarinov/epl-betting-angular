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

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "logout", component: LogoutComponent },
  {
    path: "standings/premier-league",
    component: ClubStandingsComponent,
    resolve: { standings: ClubStandingsResolver }
  },
  {
    path: "standings/betting",
    component: BetStandingsComponent,
    resolve: { standings: BetStandingsResolver }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
