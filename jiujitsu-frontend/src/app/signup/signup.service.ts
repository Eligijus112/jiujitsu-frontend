// Importing the Injectable decorator
import { Injectable } from '@angular/core';

// Importing the HttpClient module
import { HttpClient } from '@angular/common/http';

// Importing the env variables
import { environment } from "../../environments/environment";

// Sweet allert modal
import Swal from 'sweetalert2';

// Defining the backend URL for user wrangling
const BACKEND_URL = environment.apiUrl + '/users';

// Defining the user signup service
@Injectable({providedIn: "root"})
export class SignupService {

  constructor(private http: HttpClient) { }

  getBackendURL() {
    return BACKEND_URL;
  }

  // Defining the signup method
  signup(
    name: string,
    surname: string,
    email: string,
    password: string,
    confirmPassword: string,
    beltColor: string,
    stripeCount: number,
    image: File,
    adminPassword: string
    ) {

    // Creating the post data
    const postData = new FormData();
    postData.append("name", name);
    postData.append("surname", surname);
    postData.append("email", email);
    postData.append("password", password);
    postData.append("confirmPassword", confirmPassword);
    postData.append("beltColor", beltColor);
    postData.append("stripeCount", stripeCount.toString());
    postData.append("image", image, image.name);
    postData.append("adminPassword", adminPassword);

    // Sending the post request
    return this.http.post<{status_code: number, userId: number, message: string}>(
      BACKEND_URL + '/create',
      postData
    )
    .subscribe(response => {
      if (response.status_code === 201) {
        Swal.fire({
          icon: 'success',
          title: response.message,
          showConfirmButton: false,
          timer: 3000
        })
      }
    },
    error => {
      if (error.status_code === 409){
        Swal.fire({
          icon: 'error',
          title: error.error.message,
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong',
          text: error.error.message,
        })
      }
    })
  }
}
