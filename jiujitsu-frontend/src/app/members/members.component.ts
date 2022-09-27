// Component class
import { Component, OnDestroy, OnInit } from '@angular/core';

// Member service
import { MembersService } from './members.service';

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

  constructor(private membersService: MembersService) { }

  // Init method
  ngOnInit() {
    // Fetching the members
    this.membersService.fetchMembers()

    // Subscribing to the members
    this.membersService.getMembersUpdateListener()
      .subscribe((data: any) => {
        console.log(data.members)
        this.members = data.members;
        this.memberCount = data.memberCount;
      })
  }
}
