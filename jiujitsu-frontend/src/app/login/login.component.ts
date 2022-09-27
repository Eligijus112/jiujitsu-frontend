// Importing the angular core module
import { Component, OnInit } from '@angular/core';

// Handling forms
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Importing the login service
import { LoginService } from './login.service';

// Defining the signup component
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

// Component class
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any
  isAuthenticated: boolean = false;

  // Subscription to auth status
  private authStatusSub: any;

  // Adding service to the constructor
  constructor(private service: LoginService) { }

  ngOnInit() {
    // Initializing the form
    this.loginForm = new FormGroup({
      // Initializing the form controls
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required])
    });

    // Auto login
    this.service.autoAuthUser();

    // Checking if the user is authenticated
    this.isAuthenticated = this.service.getIsAuth();
  }

  // Functionality on login
  onLogin() {
    // Logging the form values
    this.service.login(
      this.loginForm.value.email,
      this.loginForm.value.password
    )
  }
}
