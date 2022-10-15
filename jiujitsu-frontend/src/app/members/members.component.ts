// Component class
import { Component, OnInit, ViewChild } from '@angular/core';

// Member service
import { MembersService } from './members.service';

// Importing the router
import { Router } from '@angular/router';

// Accordion
import { MatAccordion } from '@angular/material/expansion';

// Defining the members component
@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})

export class MembersComponent implements OnInit {

  // List of members
  members: any = [];
  memberCount: number = 0;

  constructor(private membersService: MembersService, private router: Router) { }

  @ViewChild(MatAccordion) accordion!: MatAccordion;

  // Init method
  ngOnInit() {
    // Fetching the members
    this.membersService.fetchMembers()

    // Subscribing to the members
    this.membersService.getMembersUpdateListener()
      .subscribe((data: any) => {
        this.members = data.members;
        this.memberCount = data.memberCount;
      })
  }

  // Deleting the member
  onDelete(id: number) {
    this.membersService.deleteUser(id);
  }

  // Updating the member
  onUpdate() {
    this.router.navigate(['/user']);
  }

  // Getting the user id
  getUserId() {
    return this.membersService.getUserId();
  }

  // If the user is an admin
  isAdmin() {
    return this.membersService.isAdmin();
  }

}
