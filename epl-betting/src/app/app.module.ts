import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtInterceptorService } from './core/interceptors/jwt-interceptor.service';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './core/services/auth.service';
import { LogoutComponent } from './components/logout/logout.component';
import { HeaderService } from './core/services/header.service';
import { ClubStandingsComponent } from './components/standings/club-standings/club-standings.component';
import { StandingsService } from './core/services/standings.service';
import { BetStandingsComponent } from './components/standings/bet-standings/bet-standings.component';
import { SetupRoundComponent } from './components/admin/setup-round/setup-round.component';
import { AdminService } from './core/services/admin.service';
import { SetupRoundFormComponent } from './components/admin/setup-round-form/setup-round-form.component';
import { CompleteRoundComponent } from './components/admin/complete-round/complete-round.component';
import { CompleteRoundFormComponent } from './components/admin/complete-round-form/complete-round-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    HomeComponent,
    LogoutComponent,
    ClubStandingsComponent,
    BetStandingsComponent,
    SetupRoundComponent,
    SetupRoundFormComponent,
    CompleteRoundComponent,
    CompleteRoundFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    HeaderService,
    StandingsService,
    AdminService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
