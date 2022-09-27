// Importing the Injectable decorator
import { Injectable } from '@angular/core';

// Importing the HttpClient module
import { HttpClient } from '@angular/common/http';

// Importing the env variables
import { environment } from "../../environments/environment";

// Sweet allert modal
import Swal from 'sweetalert2';

const BACKEND_URL = environment.apiUrl + '/users';

// Defining the user signup service
@Injectable({providedIn: "root"})
export class SignupService {
  constructor(private http: HttpClient) { }

  // Defining the signup method
  signup(name: string, surname: string, email: string, password: string, confirmPassword: string) {
    // Sending a post request to the signup endpoint
    return this.http.post<{status_code: number, userId: number, message: string}>(BACKEND_URL + '/create', {
      name: name,
      surname: surname,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    }).
    subscribe(response => {
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
        console.log(error.message);
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
