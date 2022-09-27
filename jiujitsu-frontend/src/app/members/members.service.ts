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

const BACKEND_URL = environment.apiUrl + '/users';

// Defining the user login service
@Injectable({providedIn: "root"})
export class MembersService {
  // Placeholder for users
  private members: any = [];
  private membersUpdated = new Subject<{members: any[], memberCount: number}>();

  constructor(private http: HttpClient, private router: Router) { }

  // Fetching the users from database
  fetchMembers() {
    this.http.get(BACKEND_URL).subscribe((members: any) => {
      this.members = members.users;
      this.membersUpdated.next(
        {
          members: [...this.members],
          memberCount: this.members.length
        }
      );
    });
  }

  // Getting the users
  getMembers() {
    return this.members;
  }

  // Fetching the observable
  getMembersUpdateListener() {
    return this.membersUpdated.asObservable();
  }
}
