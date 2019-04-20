import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StandingsService {
  private readonly baseUrl :string = 'http://localhost:5000/standings';
  private readonly clubStandingsUrl :string = `${this.baseUrl}/club`;
  private readonly userStandingsUrl :string = `${this.baseUrl}/user`;

  constructor(private http: HttpClient) { }

  getClubStandings() :Observable<any> {
    return this.http.get(this.clubStandingsUrl);
  }

  getBetStandings() :Observable<any> {
    return this.http.get((this.userStandingsUrl));
  }  
}
