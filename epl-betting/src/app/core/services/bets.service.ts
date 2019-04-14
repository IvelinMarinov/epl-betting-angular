import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BetsService {
  private readonly baseUrl = 'http://localhost:5000/bets';
  private readonly getActiveRoundUrl = `${this.baseUrl}/get-active-round`;
  private readonly submitBetsUrl = `${this.baseUrl}/submit`;

  constructor(private http: HttpClient) { }

  getActiveRound(): Observable<any> {
    return this.http.get(this.getActiveRoundUrl);
  }

  submitBets(body): Observable<any> {
    return this.http.post(this.submitBetsUrl, body)
  }
}