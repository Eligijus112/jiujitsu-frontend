// Importing the component class
import { Injectable } from '@angular/core';

// Importing the env variables
import { environment } from "../../environments/environment";

// Importing the http service
import { HttpClient } from '@angular/common/http';

// Subject class
import { Subject } from 'rxjs';

// Modals
import Swal from 'sweetalert2';

// Defining the backend URL
const BACKEND_URL = environment.apiUrl + '/users';

// Defining the service
@Injectable({providedIn: "root"})
export class UserService {
  // Creating a subject for the user information
  private userInfo = new Subject<{
    user_id: number,
    name: string,
    surname: string,
    email: string,
    rank_name: string,
    stripe_count: number,
    image_path: string
  }>();

  // Defining the user attributes
  private name: string | any;
  private surname: string | any;
  private email: string | any;
  private rank_name: string | any;
  private stripe_count: number | any;
  private image_path: string | any;

  // Defining the constructor
  constructor(private http: HttpClient) { }

  queryUser(id: number) {
    return this.http.get(BACKEND_URL + '/' + id)
    .subscribe((data: any) => {
      this.name = data.user_info.name;
      this.surname = data.user_info.surname;
      this.email = data.user_info.email;
      this.rank_name = data.user_info.rank_name;
      this.stripe_count = data.user_info.stripe_count;
      this.image_path = data.user_info.image_path;

      // Updating the user info
      this.userInfo.next({
        user_id: id,
        name: this.name,
        surname: this.surname,
        email: this.email,
        rank_name: this.rank_name,
        stripe_count: this.stripe_count,
        image_path: this.image_path
      });
    })
  }

  // Returning the user info
  getUserInfo() {
    return this.userInfo.asObservable();
  }

  // Update user info
  updateUserInfo(id: number, userInfo: any) {
    // Creating the form group needed for the update
    const postData = new FormData();
    postData.append("name", userInfo.name);
    postData.append("surname", userInfo.surname);
    postData.append("email", userInfo.email);
    postData.append("rank_name", userInfo.beltColor);
    postData.append("stripe_count", userInfo.stripeCount.toString());
    postData.append("image", userInfo.image);
    postData.append("image_path", userInfo.image_path);

    // Sending the post request
    return this.http.put<{status_code: number, message: string}>(
      BACKEND_URL + '/' + id,
      postData
    ).subscribe(response => {
      if (response.status_code === 200) {
        Swal.fire({
          icon: 'success',
          title: response.message,
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

}
