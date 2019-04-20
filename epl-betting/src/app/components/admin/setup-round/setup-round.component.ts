import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setup-round',
  templateUrl: './setup-round.component.html',
  styleUrls: ['./setup-round.component.css']
})
export class SetupRoundComponent implements OnInit {
  public selectedRound: number;
  public isRoundSelected: boolean;
  public rounds: Array<number>;

  constructor() {
    this.rounds = this.getRoundsArray();
  }

  ngOnInit() { }

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
  }
}
