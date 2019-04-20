import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { ClubStandingsComponent } from './components/standings/club-standings/club-standings.component';
import { BetStandingsComponent } from './components/standings/bet-standings/bet-standings.component';
import { SetupRoundComponent } from './components/admin/setup-round/setup-round.component';
import { SetupRoundFormComponent } from './components/admin/setup-round-form/setup-round-form.component';
import { CompleteRoundComponent } from './components/admin/complete-round/complete-round.component';
import { CompleteRoundFormComponent } from './components/admin/complete-round-form/complete-round-form.component';
import { PlaceBetsComponent } from './components/bets/place-bets/place-bets.component';
import { PlaceBetsFormComponent } from './components/bets/place-bets-form/place-bets-form.component';

import { JwtInterceptorService } from './core/interceptors/jwt-interceptor.service';
import { AuthService } from './core/services/auth.service';
import { HeaderService } from './core/services/header.service';
import { StandingsService } from './core/services/standings.service';
import { AdminService } from './core/services/admin.service';
import { BetsService } from './core/services/bets.service';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';

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
    PlaceBetsComponent,
    PlaceBetsFormComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-full-width',
      preventDuplicates: true,
    })
  ],
  providers: [
    AuthService,
    HeaderService,
    StandingsService,
    AdminService,
    BetsService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
