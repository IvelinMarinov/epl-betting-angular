import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomToastrService } from 'src/app/core/services/custom-toastr.service';

const ErrorMessagesToRender = [
  'There is no active round currently, please come back again later!',
  'Sorry, we are no longer accepting bets for this round'
]

@Component({
  selector: 'app-place-bets',
  templateUrl: './place-bets.component.html',
  styleUrls: ['./place-bets.component.css']
})
export class PlaceBetsComponent implements OnInit {
  data: any;
  fixture: any;
  renderError: boolean;
  error: string;

  constructor(private route: ActivatedRoute, private toastr: CustomToastrService) { }

  ngOnInit() {
    this.data = this.route.snapshot.data['fixture'];
    console.log(this.data)

    if (ErrorMessagesToRender.includes(this.data.message)) {
      this.renderError = true;
      this.error = this.data.message;
      return;
    }

    if (!this.data.success) {
      this.toastr.showError(this.data.message)
      return;
    }    

    this.fixture = this.data.data;
  }
}