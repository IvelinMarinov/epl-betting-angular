import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {
  activeClass :string = "active";
  isLoggedIn :boolean;
  username :string;

  constructor(private authSevice :AuthService) { 
    this.isLoggedIn = authSevice.isAuthenticated();
    this.username = authSevice.getUsername();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.isLoggedIn = this.authSevice.isAuthenticated();
    this.username = this.authSevice.getUsername();
  }

}
