// Importing the angular core module
import { Component, OnInit } from '@angular/core';

// Handling forms
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Importing the signup service
import { SignupService } from './signup.service';

// Defining the signup component
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
    signupForm: FormGroup | any
    formValid: boolean = false;

    // Boolean indicating a valid form
    isValidForm() {
      this.formValid = this.signupForm.valid;
    }

    // Adding the form to the constructor
    constructor( private service: SignupService ) { }

    ngOnInit() {
        // Initializing the form
        this.signupForm = new FormGroup({
            // Initializing the form controls
            'name': new FormControl(null, Validators.required),
            'surname': new FormControl(null, Validators.required),
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
            'confirmPassword': new FormControl(null, [Validators.required, Validators.minLength(6)])
        });

        this.signupForm.valueChanges.subscribe(() => {
          this.isValidForm();
        });
    }

    // Defining the onSignup method
    onSignup() {
        // Logging the form values
        this.service.signup(
            this.signupForm.value.name,
            this.signupForm.value.surname,
            this.signupForm.value.email,
            this.signupForm.value.password,
            this.signupForm.value.confirmPassword
        )
    }
  }
