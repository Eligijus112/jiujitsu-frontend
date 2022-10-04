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

// Datetime to date conversion
import { DatePipe } from '@angular/common';

// Importing teh auth service
import { LoginService } from '../login/login.service';

// URL to get users
const BACKEND_URL = environment.apiUrl + '/users';

// URL for images
const IMAGE_URL = environment.imageUrl

// Defining the user login service
@Injectable({providedIn: "root"})
export class MembersService {
  // Placeholder for users
  private members: any = [];
  private membersUpdated = new Subject<{members: any[], memberCount: number}>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private loginService: LoginService
    ) { }

  // Fetching the users from database
  fetchMembers() {
    // Fetching auth data
    this.loginService.autoAuthUser();

    // Fetching the users
    this.http.get(BACKEND_URL)
    .subscribe((members: any) => {
      // Changing the created_at field to a date
      members.users.forEach((member: any) => {
        member.created_at = new DatePipe('en-US').transform(member.created_at, 'yyyy-MM-dd');
        member.image_path = IMAGE_URL + '/' + member.image_path;
      });
      this.members = members.users;
      this.membersUpdated.next(
        {
          members: [...this.members],
          memberCount: this.members.length
        }
      );
    })
  }

  // Getting the users
  getMembers() {
    return this.members;
  }

  // Infering whether the current active user is an admin
  isAdmin() {
    return this.loginService.getIsAdmin();
  }

  // Fetching the observable
  getMembersUpdateListener() {
    return this.membersUpdated.asObservable();
  }

  // Getting the user id
  getUserId() {
    return this.loginService.getUserId();
  }

  // Deleting the user
  deleteUser(id: number) {
    // Deleting the user
    this.http.delete(BACKEND_URL + '/' + id)
    .subscribe(() => {
      // Updating the users
      this.fetchMembers();
    })
  }

}
