import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly baseUrl = 'http://localhost:5000/admin';
  private readonly allTeamsUrl = `${this.baseUrl}/all-teams`;
  private readonly saveRoundUrl = `${this.baseUrl}/save-round`;
  private readonly getActiveRoundUrl = `${this.baseUrl}/get-active-round`;
  private readonly completeRoundUrl = `${this.baseUrl}/complete-round`;

  constructor(private http: HttpClient) { }

  getAllTeams(): Observable<any> {
    return this.http.get(this.allTeamsUrl)
  }

  saveRoundData(body): Observable<any> {
    return this.http.post<any>(this.saveRoundUrl, body)
  }

  getActiveRound() :Observable<any> {
    return this.http.get<any>(this.getActiveRoundUrl)
  }

  completeRound(body) :Observable<any> {
    return this.http.post<any>(this.completeRoundUrl, body)
  }
}
