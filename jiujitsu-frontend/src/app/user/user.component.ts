// Angular component
import { Component, OnInit } from '@angular/core';

// Importing the authentication component
import { LoginService } from '../login/login.service';

// Importing the user profile service
import { UserService } from './user.service';

// Handling forms
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Creating the user profile component
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  // Defining the user id
  user_id: number | any;

  // Form variables
  userInfoForm: FormGroup | any
  formValid: boolean = false;

  // User info dictionary
  userInfo: any = {};

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
    this.formValid = this.userInfoForm.valid;
  }

  // Defining the constructor
  constructor(
    private loginService: LoginService,
    private userService: UserService
  ) { }

  // Defining the nginit
  ngOnInit() {
    // Auto authentication
    this.loginService.autoAuthUser();

    // Getting the user id
    this.user_id = this.loginService.getUserId();

    // Getting the user profile
    this.userService.queryUser(this.user_id);

      // Initializing the form
      this.userInfoForm = new FormGroup({
        // Initializing the form controls
        'name': new FormControl(null),
        'surname': new FormControl(null),
        'email': new FormControl(null),
        'rank_name': new FormControl(null),
        'stripe_count': new FormControl(null),
        'image_path': new FormControl(null)
      });

    // Subscription to user info
    this.userService.getUserInfo()
    .subscribe((userInfo: any) => {
      this.userInfo = userInfo;
      console.log(this.userInfo)
      // Updating the form
      this.userInfoForm.patchValue({
        'name': this.userInfo.name,
        'surname': this.userInfo.surname,
        'email': this.userInfo.email,
        'rank_name': this.userInfo.rank_name,
        'stripe_count': this.userInfo.stripe_count,
        'image_path': this.userInfo.image_path
      });
    });

    this.userInfoForm.valueChanges.subscribe(() => {
      this.isValidForm();
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];

    this.userInfoForm.patchValue({image: file});
    this.userInfoForm.get('image').updateValueAndValidity();

    // Reading the image
    const reader = new FileReader();
    // Reading the image
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

  update() {
    // Updating the user profile
    this.userService.updateUserInfo(this.user_id, this.userInfo);
  }

}
