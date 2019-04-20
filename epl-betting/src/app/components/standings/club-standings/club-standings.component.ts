import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClubStanding } from '../../shared/models/ClubStanding';

@Component({
  selector: 'app-club-standings',
  templateUrl: './club-standings.component.html',
  styleUrls: ['./club-standings.component.css']
})
export class ClubStandingsComponent implements OnInit {
  public standings: Array<ClubStanding>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let data = this.route.snapshot.data['standings'].data;
    this.standings = this.processStats(data);
  }

  processStats(stats :Array<ClubStanding>) :Array<ClubStanding> {
    stats.forEach(s => s['goalDifference'] = s.goalsScored - s.goalsConceded);

    return stats.sort(function (a, b) {
      var pointsSort = b.points - a.points;
      if (pointsSort !== 0) {
        return pointsSort
      }
      return b.goalDifference - a.goalDifference;
    })
  }
}