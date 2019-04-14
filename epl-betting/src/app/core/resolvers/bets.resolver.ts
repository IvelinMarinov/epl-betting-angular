import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Fixture } from 'src/app/components/shared/models/Fixture';
import { BetsService } from '../services/bets.service';

@Injectable({
    providedIn: 'root'
})
export class BetsResolver implements Resolve<Fixture> {
    constructor(private betsService: BetsService) { }

    resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) :Observable<Fixture> {
        return this.betsService.getActiveRound();
    }
}