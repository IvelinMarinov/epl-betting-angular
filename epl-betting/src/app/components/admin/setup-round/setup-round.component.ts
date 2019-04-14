import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-setup-round',
  templateUrl: './setup-round.component.html',
  styleUrls: ['./setup-round.component.css']
})
export class SetupRoundComponent implements OnInit {
  public selectedRound: number;
  public isRoundSelected: boolean;
  //public teamsDropDownData$: Observable<any>;
  public rounds: Array<number>;

  constructor() {
    this.rounds = this.getRoundsArray();
  }

  ngOnInit() {
    //this.teamsDropDownData$ = this.adminService.getAllTeams()
  }

  getRoundsArray() {
    let arr = [];
    for (let i = 1; i <= 38; i++) {
      arr.push(i);
    }

    return arr;
  }

  handleRoundsDropDownChange(event :any) {
    this.selectedRound = event.target.value;
    this.isRoundSelected = true;
    console.log(event.target.value);
  }
}
