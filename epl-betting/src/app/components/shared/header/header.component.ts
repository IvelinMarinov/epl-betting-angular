import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  activeClass: string = "active";
  isLoggedIn$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  username$: Observable<string>;

  constructor(private headerSevice: HeaderService) { 
    this.isLoggedIn$= headerSevice.isLoggedIn$;
    this.isAdmin$ = headerSevice.isAdmin$;
    this.username$ = headerSevice.username$;
  }

  ngOnInit() {
  }
}
