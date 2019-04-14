import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AdminService } from 'src/app/core/services/admin.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Team } from '../../shared/models/Team';

@Component({
  selector: 'app-setup-round-form',
  templateUrl: './setup-round-form.component.html',
  styleUrls: ['./setup-round-form.component.css']
})
export class SetupRoundFormComponent implements OnInit, OnDestroy {
  @Input()
  selectedRound: number;

  form: FormGroup;
  teamsDropDownData: Array<Team>;
  subsciption: Subscription
  gameNumbers: Array<number>;

  constructor(private fb: FormBuilder, private adminService: AdminService
  ) {
    this.gameNumbers = this.getGameNumbersArray();
  }

  ngOnInit() {
    this.subsciption = this.adminService.getAllTeams()
      .subscribe(
        res => {
          if (res.success) {
            this.teamsDropDownData = this.sortTeams(res.data);
            console.log(this.teamsDropDownData)
          } else {
            console.warn(res.message)
          }
        },
        error => console.warn(error)
      );

    this.form = this.fb.group({
      home_1: ['', Validators.required], away_1: ['', Validators.required],
      home_2: ['', Validators.required], away_2: ['', Validators.required],
      home_3: ['', Validators.required], away_3: ['', Validators.required],
      home_4: ['', Validators.required], away_4: ['', Validators.required],
      home_5: ['', Validators.required], away_5: ['', Validators.required],
      home_6: ['', Validators.required], away_6: ['', Validators.required],
      home_7: ['', Validators.required], away_7: ['', Validators.required],
      home_8: ['', Validators.required], away_8: ['', Validators.required],
      home_9: ['', Validators.required], away_9: ['', Validators.required],
      home_10: ['', Validators.required], away_10: ['', Validators.required],
      betsAcceptedBy: ['', Validators.required],
    });
  }

  ngOnDestroy() {
    this.subsciption.unsubscribe();
  }

  getGameNumbersArray(): Array<number> {
    let arr = [];
    for (let i = 1; i <= 10; i++) {
      arr.push(i);
    }
    return arr;
  }

  sortTeams(teams: Array<Team>): Array<Team> {
    return teams.sort(function (a, b) {
      return a.name.localeCompare(b.name)
    })
  }

  submitRound() {
    const values: Array<string> = Object.values(this.form.value);
    if (values.filter(v => v === '').length) {
      console.error('All fields are required');
      return;
    }

    const uniqueValues = Array.from(new Set<string>(values))
    if (uniqueValues.length !== values.length) {
      console.error('The same team cannot be selected for more than one game');
      return;
    }

    const reqBody = {
      betsAcceptedBy: this.form.controls.betsAcceptedBy.value,
      round: this.selectedRound,
      games: this.transformStateToReqBody(this.form.value)
    }

    this.adminService.saveRoundData(reqBody).subscribe(
      res => {
        if (res.success) {
          console.log(res)
          //success message
          //redirect
        } else {
          console.warn(res.message)
        }
      },
      error => console.warn(error)
    )
  }

  transformStateToReqBody(state) {
    let reqBody = {}
    for (let [key, value] of Object.entries(state)) {
      if (key === 'betsAcceptedBy') {
        continue;
      }

      const [homeOrAway, gameNum] = key.split('_');

      let gameNumAdded = Object.keys(reqBody).filter(k => k === gameNum);
      if (gameNumAdded.length === 0) {
        reqBody[gameNum] = {
          home_team_id: 'X',
          away_team_id: 'X'
        }
      }

      if (homeOrAway.trim() === 'home') {
        reqBody[gameNum].home_team_id = value
      } else {
        reqBody[gameNum].away_team_id = value
      }
    }

    return reqBody;
  }
}