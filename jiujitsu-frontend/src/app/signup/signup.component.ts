// Importing the angular core module
import { Component, OnInit } from '@angular/core';

// Handling forms
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Importing the signup service
import { SignupService } from './signup.service';

// Mime type validator
import { mimeType } from './mime-type.validator';

// Defining the signup component
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
    signupForm: FormGroup | any
    formValid: boolean = false;

    // User image preview
    imagePreview: string = '';

    // Constant for belt colors
    beltColors = [
      'white',
      'blue',
      'purple',
      'brown',
      'black'
    ];

    // Stripe counts
    stripeCounts = [
      0,
      1,
      2,
      3,
      4,
    ]

    // Boolean indicating a valid form
    isValidForm() {
      this.formValid = this.signupForm.valid;
    }

    // Adding the form to the constructor
    constructor( private service: SignupService ) { }

    onImagePicked(event: Event) {
      const file = (event.target as HTMLInputElement).files![0];

      this.signupForm.patchValue({image: file});
      this.signupForm.get('image').updateValueAndValidity();

      // Reading the image
      const reader = new FileReader();
      // Reading the image
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      }
      reader.readAsDataURL(file);
    }

    ngOnInit() {

        // Initializing the form
        this.signupForm = new FormGroup({
            // Initializing the form controls
            'name': new FormControl(null, Validators.required),
            'surname': new FormControl(null, Validators.required),
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'beltColor': new FormControl(null, Validators.required),
            'stripeCount': new FormControl(null, Validators.required),
            'image': new FormControl(null, {
              validators: [Validators.required],
              asyncValidators: [mimeType]
            }),
            'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
            'confirmPassword': new FormControl(null, [Validators.required, Validators.minLength(6)]),
            'adminPassword': new FormControl(null, [Validators.required, Validators.minLength(6)]),
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
            this.signupForm.value.confirmPassword,
            this.signupForm.value.beltColor,
            this.signupForm.value.stripeCount,
            this.signupForm.value.image,
            this.signupForm.value.adminPassword
        )
    }
  }
