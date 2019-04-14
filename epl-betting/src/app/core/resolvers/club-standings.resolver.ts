import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StandingsService } from '../services/standings.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ClubStanding } from 'src/app/components/shared/models/ClubStanding';

@Injectable({
    providedIn: 'root'
})
export class ClubStandingsResolver implements Resolve<Array<ClubStanding>> {
    constructor(private standingsService: StandingsService) { }

    resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) :Observable<Array<ClubStanding>> {
        return this.standingsService.getClubStandings();
    }

}