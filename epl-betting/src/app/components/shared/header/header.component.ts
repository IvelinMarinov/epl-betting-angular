import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService, User } from 'src/app/core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {
  activeClass: string = "active";
  isLoggedIn$: Observable<boolean>;
  user$: Observable<User>;
  //username :string;

  constructor(private authSevice: AuthService) { 

    this.isLoggedIn$= authSevice.isLoggedIn$;

    //this.isLoggedIn$.subscribe(data => console.log(typeof(data), data))
    //console.log(this.isLoggedIn$)

    //this.username = authSevice.getUsername();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log('changing')
  }

  // ngOnChanges() {
  //   this.isLoggedIn$ = this.authSevice.isAuthenticated();
  //   this.username = this.authSevice.getUsername();
  // }

}
