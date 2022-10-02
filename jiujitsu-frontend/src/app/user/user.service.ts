// Importing the component class
import { Injectable } from '@angular/core';

// Importing the env variables
import { environment } from "../../environments/environment";

// Importing the http service
import { HttpClient } from '@angular/common/http';

// Subject class
import { Subject } from 'rxjs';

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
    console.log(id);
    console.log(userInfo);
    //return this.http.put(BACKEND_URL + '/' + userInfo.user_id, userInfo);
  }

}
