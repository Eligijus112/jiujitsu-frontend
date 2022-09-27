// Importing the angular core module
import { Component, OnDestroy, OnInit } from '@angular/core';

// Importing the authentication component
import { LoginService } from '../login/login.service';

// Importingthe subscription
import { Subscription } from 'rxjs';

// Defining the header component
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  // User id
  user_id: number | any;
  is_admin: boolean = false;
  is_active: boolean = false;
  is_auth: boolean = false;

  // Authentication status listener
  private authListenerSubs: Subscription | any;

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit() {
    // Auto authentication
    this.loginService.autoAuthUser();
    this.user_id = this.loginService.getUserId();
    this.is_admin = this.loginService.getIsAdmin();
    this.is_active = this.loginService.getIsActive();
    this.is_auth = this.loginService.getIsAuth();

    // Subscribing to the auth status listening
    this.authListenerSubs = this.loginService.getAuthStatusListener().
      subscribe(isAuthenticated => {
        this.is_auth = isAuthenticated;
        this.user_id = this.loginService.getUserId();
        this.is_admin = this.loginService.getIsAdmin();
        this.is_active = this.loginService.getIsActive();
      }
    );
  }

  // Functionality on logout
  onLogout() {
    this.loginService.logout();
  }

  // On destroy
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}


