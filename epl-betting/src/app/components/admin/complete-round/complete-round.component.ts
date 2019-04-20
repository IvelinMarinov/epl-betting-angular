import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin.service';
import { Subscription } from 'rxjs';
import { Fixture } from '../../shared/models/Fixture';
import { CustomToastrService } from 'src/app/core/services/custom-toastr.service';

const ErrorMessagesToRender = [
  'There are no active rounds, please set up a new round!',
  'More than one active round, please contact your db admin!'
]

@Component({
  selector: 'app-complete-round',
  templateUrl: './complete-round.component.html',
  styleUrls: ['./complete-round.component.css']
})
export class CompleteRoundComponent implements OnInit, OnDestroy {
  fixture: Fixture;
  renderError: boolean = false;
  hasFetched: boolean;
  error: string;
  fixtureSubscription: Subscription;

  constructor(private adminService: AdminService, private toastr: CustomToastrService) {
    this.renderError = false;
    this.hasFetched = false;
  }

  ngOnInit() {
    this.fixtureSubscription = this.adminService.getActiveRound()
      .subscribe(
        res => {
          this.hasFetched = true;
          if (ErrorMessagesToRender.includes(res.message)) {
            this.error = res.message;
            this.renderError = true;
            return;
          }

          if (res.success) {
            this.fixture = res.data;
          } else {
            this.toastr.showError(res.message)
          }
        },
        error => this.toastr.showSystemError()
      )
  }

  ngOnDestroy() {
    this.fixtureSubscription.unsubscribe();
  }
} 