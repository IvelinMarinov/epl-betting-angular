import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BetStanding } from '../../shared/models/BetStanding';

@Component({
  selector: 'app-bet-standings',
  templateUrl: './bet-standings.component.html',
  styleUrls: ['./bet-standings.component.css']
})
export class BetStandingsComponent implements OnInit {
  public standings: Array<BetStanding>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let data = this.route.snapshot.data['standings'].data
    this.standings = this.sortStandings(data);
  }

  sortStandings(standings: Array<BetStanding>): Array<BetStanding> {
    return standings.sort(function (a, b) {
      var pointsSort = b.points - a.points;
      if (pointsSort !== 0) {
        return pointsSort
      }

      var guessedSignsSort = b.guessedSigns - a.guessedSigns;
      if (guessedSignsSort !== 0) {
        return guessedSignsSort
      }

      return b.guessedScores - a.guessedScores;
    });
  }
}