// Importing the Injectable decorator
import { Injectable } from '@angular/core';

// Importing the HttpClient module
import { HttpClient } from '@angular/common/http';

// Importing the env variables
import { environment } from "../../environments/environment";

// Observable class
import { Subject } from 'rxjs';

// Importing the router
import { Router } from '@angular/router';

// Sweet allert modal
import Swal from 'sweetalert2';

const BACKEND_URL = environment.apiUrl + '/users';

// Defining the user login service
@Injectable({providedIn: "root"})
export class LoginService {
  // is authenticated variable
  private isAuthenticated: boolean = false;

  // Token variable
  private token: string | any;

  // Token timer
  private tokenTimer: NodeJS.Timer | any;

  // user_id
  private user_id: number | any;

  // Admin and activity status
  private isAdmin: boolean = false;
  private isActive: boolean = false;

  // Extracting the token
  getToken() {
    return this.token;
  }

  // Getting the status
  getIsAuth() {
    return this.isAuthenticated;
  }

  // Getting the user id
  getUserId() {
    return this.user_id;
  }

  // Getting the admin status
  getIsAdmin() {
    return this.isAdmin;
  }

  // Getting the activity status
  getIsActive() {
    return this.isActive;
  }

  // Method to get auth status
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  // Timer setting
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  // Defining a subject for authentication
  authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  // Getting the token from the local storage and parsing the information from it
  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration_date");
    const user_id = localStorage.getItem("user_id");
    const is_admin = localStorage.getItem("is_admin") == "true";
    const is_active = localStorage.getItem("is_active") == "true";

    // If either of the values are null we return null from the function
    if ((!token) || (!expirationDate)) {
      return {
        token: null,
        expirationDate: null
      }
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      user_id: user_id,
      isAdmin: is_admin,
      isActive: is_active
    }
  }

  // Auto login
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation.token) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true
      this.isAdmin = authInformation.isAdmin;
      this.isActive = authInformation.isActive;
      this.user_id = authInformation.user_id;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  // Defining the login method
  login(email: string, password: string) {
    // Sending a post request to the login endpoint
    return this.http.post<{
      status_code: number,
      user_id: number,
      message: string,
      is_active: boolean,
      is_admin: boolean,
      token: string,
      expires_in: number
    }>(BACKEND_URL + '/login', {
      email: email,
      password: password
    }).
    subscribe(response => {
      if (response.status_code === 200) {
        Swal.fire({
          icon: 'success',
          title: response.message,
          showConfirmButton: false,
          timer: 3000
        })

        // Storing the token in the local storage
        localStorage.setItem('token', response.token);
        localStorage.setItem('user_id', response.user_id.toString());
        localStorage.setItem('is_admin', response.is_admin.toString());
        localStorage.setItem('is_active', response.is_active.toString());

        // Calculating when the token will expire
        const expiration_date = new Date(new Date().getTime() + response.expires_in * 1000)
        localStorage.setItem('expiration_date', expiration_date.toString());

        // Setting class attributes
        this.token = response.token;
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.user_id = response.user_id;

        this.router.navigate(["/"]);
      }
    },
    error => {
      if (error.status_code !== 200){
        console.log(error.message);
        Swal.fire({
          icon: 'error',
          title: error.error.message,
        })
      }
    })
  }

  // Clearing the local storage
  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration_date");
    localStorage.removeItem("user_id");
    localStorage.removeItem("is_admin");
    localStorage.removeItem("is_active");
  }

  // Logging out the user
  logout() {
    // Clearing the local storage
    this.clearAuthData();

    // Clearing the timer
    clearTimeout(this.tokenTimer);

    // Setting the attributes to null
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.user_id = null;

    // Redirecting to the login page
    this.router.navigate(["/"]);
  }
}
