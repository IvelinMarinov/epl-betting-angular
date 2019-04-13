import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StandingsService } from '../services/standings.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BetStanding } from 'src/app/components/shared/models/BetStanding';

@Injectable({
    providedIn: 'root'
})
export class BetStandingsResolver implements Resolve<Array<BetStanding>> {
    constructor(private strandingsService: StandingsService) { }

    resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) :Observable<Array<BetStanding>> {
        return this.strandingsService.getBetStandings();
    }
}