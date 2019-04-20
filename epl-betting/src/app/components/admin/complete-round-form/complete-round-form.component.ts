import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Fixture } from '../../shared/models/Fixture';
import { AdminService } from 'src/app/core/services/admin.service';
import { CustomToastrService } from 'src/app/core/services/custom-toastr.service';

@Component({
  selector: 'app-complete-round-form',
  templateUrl: './complete-round-form.component.html',
  styleUrls: ['./complete-round-form.component.css']
})
export class CompleteRoundFormComponent implements OnInit {
  @Input() fixture: Fixture;
  form: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private adminService: AdminService,
    private toastr: CustomToastrService
    ) { }

  ngOnInit() {
    this.form = this.fb.group({
      home_1: ['', Validators.required], away_1: ['', Validators.required], id_1: [this.fixture.gameStats[0]._id, Validators.required],
      home_2: ['', Validators.required], away_2: ['', Validators.required], id_2: [this.fixture.gameStats[1]._id, Validators.required],
      home_3: ['', Validators.required], away_3: ['', Validators.required], id_3: [this.fixture.gameStats[2]._id, Validators.required],
      home_4: ['', Validators.required], away_4: ['', Validators.required], id_4: [this.fixture.gameStats[3]._id, Validators.required],
      home_5: ['', Validators.required], away_5: ['', Validators.required], id_5: [this.fixture.gameStats[4]._id, Validators.required],
      home_6: ['', Validators.required], away_6: ['', Validators.required], id_6: [this.fixture.gameStats[5]._id, Validators.required],
      home_7: ['', Validators.required], away_7: ['', Validators.required], id_7: [this.fixture.gameStats[6]._id, Validators.required],
      home_8: ['', Validators.required], away_8: ['', Validators.required], id_8: [this.fixture.gameStats[7]._id, Validators.required],
      home_9: ['', Validators.required], away_9: ['', Validators.required], id_9: [this.fixture.gameStats[8]._id, Validators.required],
      home_10: ['', Validators.required], away_10: ['', Validators.required], id_10: [this.fixture.gameStats[9]._id, Validators.required],
    })
  }

  submitResults() {
    const values = Object.values(this.form.value);
    if (values.filter(v => v === '').length) {
      this.toastr.showError('All scores are required');
      return;
    }

    let reqBody = this.transformDataToReqBody();

    this.adminService.completeRound(reqBody).subscribe(
      res => {
        if (res.success) {
          this.toastr.showSuccess(res.message);
        } else {
          this.toastr.showError(res.message);
        }
      },
      error => this.toastr.showSystemError()
    )
  }

  transformDataToReqBody() {
    let games = {}

    for (let [key, value] of Object.entries(this.form.value)) {
      const [prop, gameNum] = key.split('_');

      let gameNumAdded = Object.keys(games).filter(k => k === gameNum);
      if (gameNumAdded.length === 0) {
        games[gameNum] = {
          home_team_score: '0',
          away_team_score: '0',
          game_id: ''
        }
      }

      if (prop.trim() === 'home') {
        games[gameNum].home_team_score = value
      } else if (prop.trim() === 'away') {
        games[gameNum].away_team_score = value
      } else {
        games[gameNum].game_id = value
      }
    }

    //set sign
    for (let game of Object.values(games)) {
      let homeGoals = Number(game['home_team_score']);
      let awayGoals = Number(game['away_team_score']);

      if (homeGoals > awayGoals) {
        game['sign'] = '1'
      } else if (homeGoals < awayGoals) {
        game['sign'] = '2'
      } else {
        game['sign'] = 'X'
      }
    }

    return {
      fixtureId: this.fixture._id,
      games: games
    }
  }

  getTeamLogoUrl(teamName) {
    return `assets/images/club-logos/${teamName}.svg`
  }
}