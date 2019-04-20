import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Fixture } from '../../shared/models/Fixture';
import { BetsService } from 'src/app/core/services/bets.service';
import { CustomToastrService } from 'src/app/core/services/custom-toastr.service';

const AllScoresRequiredMsg = 'All scores are required';
const BetsSubmitSuccessMssg = 'Bets submitted successfully!';

@Component({
  selector: 'app-place-bets-form',
  templateUrl: './place-bets-form.component.html',
  styleUrls: ['./place-bets-form.component.css']
})
export class PlaceBetsFormComponent implements OnInit {
  @Input()
  fixture: Fixture;
  form: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private betsService: BetsService,
    private toastr: CustomToastrService,
    private router: Router
    ) { }

  ngOnInit() {
    this.createForm();
  }

  getTeamLogoUrl(teamName) {
    return `assets/images/club-logos/${teamName}.svg`
  }

  submitBets() {
    const values = Object.values(this.form.value);
    if (values.filter(v => v === '').length) {
      this.toastr.showError(AllScoresRequiredMsg);
      return;
    }

    let reqBody = this.transformStateToRequestBody();
    this.betsService.submitBets(reqBody)
      .subscribe(res => {
          if (res.success) {
            this.toastr.showSuccess(BetsSubmitSuccessMssg);
            this.router.navigate(['/standings/premier-league']);
          } else {
            this.toastr.showError(res.message)
          }
        },
        error => this.toastr.showSystemError()
      )
  }

  transformStateToRequestBody() {
    let games = {}
    for (let [key, value] of Object.entries(this.form.value)) {
      const [prop, gameNum] = key.split('_');

      let gameNumAdded = Object.keys(games).filter(k => k === gameNum);
      if (gameNumAdded.length === 0) {
        games[gameNum] = {
          homeTeamGoals: '0',
          awayTeamGoals: '0'
        }
      }

      if (prop.trim() === 'home') {
        games[gameNum].homeTeamGoals = value
      } else if (prop.trim() === 'away') {
        games[gameNum].awayTeamGoals = value
      } else {
        games[gameNum].gameId = value
      }

      //set sign
      for (let game of Object.values(games)) {
        let homeGoals = Number(game['homeTeamGoals']);
        let awayGoals = Number(game['awayTeamGoals']);

        if (homeGoals > awayGoals) {
          game['sign'] = '1'
        } else if (homeGoals < awayGoals) {
          game['sign'] = '2'
        } else {
          game['sign'] = 'X'
        }
      }
    }

    return games;
  }

  createForm() {
    this.form = this.fb.group({
      home_1: [this.fixture.gameStats[0].homeTeamGoals || '0', Validators.required],
      home_2: [this.fixture.gameStats[1].homeTeamGoals || '0', Validators.required],
      home_3: [this.fixture.gameStats[2].homeTeamGoals || '0', Validators.required],
      home_4: [this.fixture.gameStats[3].homeTeamGoals || '0', Validators.required],
      home_5: [this.fixture.gameStats[4].homeTeamGoals || '0', Validators.required],
      home_6: [this.fixture.gameStats[5].homeTeamGoals || '0', Validators.required],
      home_7: [this.fixture.gameStats[6].homeTeamGoals || '0', Validators.required],
      home_8: [this.fixture.gameStats[7].homeTeamGoals || '0', Validators.required],
      home_9: [this.fixture.gameStats[8].homeTeamGoals || '0', Validators.required],
      home_10: [this.fixture.gameStats[9].homeTeamGoals || '0', Validators.required],
      away_1: [this.fixture.gameStats[0].awayTeamGoals || '0', Validators.required],
      away_2: [this.fixture.gameStats[1].awayTeamGoals || '0', Validators.required],
      away_3: [this.fixture.gameStats[2].awayTeamGoals || '0', Validators.required],
      away_4: [this.fixture.gameStats[3].awayTeamGoals || '0', Validators.required],
      away_5: [this.fixture.gameStats[4].awayTeamGoals || '0', Validators.required],
      away_6: [this.fixture.gameStats[5].awayTeamGoals || '0', Validators.required],
      away_7: [this.fixture.gameStats[6].awayTeamGoals || '0', Validators.required],
      away_8: [this.fixture.gameStats[7].awayTeamGoals || '0', Validators.required],
      away_9: [this.fixture.gameStats[8].awayTeamGoals || '0', Validators.required],
      away_10: [this.fixture.gameStats[9].awayTeamGoals || '0', Validators.required],
      id_1: [this.fixture.gameStats[0]._id],
      id_2: [this.fixture.gameStats[1]._id],
      id_3: [this.fixture.gameStats[2]._id],
      id_4: [this.fixture.gameStats[3]._id],
      id_5: [this.fixture.gameStats[4]._id],
      id_6: [this.fixture.gameStats[5]._id],
      id_7: [this.fixture.gameStats[6]._id],
      id_8: [this.fixture.gameStats[7]._id],
      id_9: [this.fixture.gameStats[8]._id],
      id_10: [this.fixture.gameStats[9]._id],
    })
  }
}