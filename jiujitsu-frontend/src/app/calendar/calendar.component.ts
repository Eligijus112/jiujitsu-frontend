import { Component, OnInit, ViewChild } from '@angular/core';

// Importing the calendar service class
import CalendarService from './calendar.service';

// Importing the member service class
import { MembersService } from '../members/members.service';

// Accordion
import { MatAccordion } from '@angular/material/expansion';

// Importing teh environmet
import { environment } from "../../environments/environment";

// Defining the image url
const IMAGE_URL = environment.imageUrl;

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  // Array to hold all the members
  members: any = [];

  // Getting the current date
  date = new Date();

  // Defining the user id
  user_id: number | any;

  // Placeholder for calendar array
  calendar: any = [];

  // Placeholder for the morning attendance for the current user
  morning_attendance: any = [];

  // Placeholder for evening attendance for the current user
  evening_attendance: any = [];

  // Saving only the date part
  // (without the time part)
  today = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());

  // Placeholder for days
  days = Array.from({length: 7}, (v, k) => k).map(day => {
    const date = new Date(this.today);
    date.setDate(date.getDate() + day);

    // Converting to ISOString
    const isoDate = date.toISOString().split('T')[0];

    // Creating an entry of the following form:
    // { date: YYYY-mm-dd, weekday: weekday }
    return {
      date: isoDate,
      weekday: date.toLocaleDateString('en-GB', { weekday: 'long' }),
      morning_count: 0,
      evening_count: 0
    };
  })

  constructor (private calendarService: CalendarService, private memberService: MembersService) {}

  ngOnInit() {

    // Fetching all the members
    this.memberService.fetchMembers();

    // Subscribing to the members
    this.memberService.getMembersUpdateListener()
      .subscribe((data: any) => {
        this.members = data.members;
      })

    this.calendarService.autoAuthUser();
    this.user_id = this.calendarService.getUserId();

    // Querying the calendar
    this.calendarService.getCalendar(this.days[0].date, this.days[6].date);

    // Querying the morning goers
    this.calendarService.getMorningGoers(this.days[0].date, this.days[6].date);

    // Subscribing to morning goers
    this.calendarService.getMorningGoersObservable().subscribe((data: any) => {
      this.morning_attendance = data.data;
    })

    // Querying the evening goers
    this.calendarService.getEveningGoers(this.days[0].date, this.days[6].date);

    // Subscribing to evening goers
    this.calendarService.getEveningGoersObservable().subscribe((data: any) => {
      this.evening_attendance = data.data;
    })

    // Subscribing to the calendar
    this.calendarService.getCalendarObservable().subscribe((data: any) => {
      this.calendar = data.data;

      // Updating the days array
      this.days.map(day => {
        // Getting the date
        const date = day.date;
        // Getting the calendar entry of that date
        const calendar_entry = this.calendar.find((entry: any) => entry.date === date);
        if (calendar_entry) {
          day.morning_count = Number(calendar_entry.morning_sum);
          day.evening_count = Number(calendar_entry.evening_sum);
        }
      })
    });
  }

  @ViewChild(MatAccordion) accordion!: MatAccordion;

  totalDays() {
    return this.days.length;
  }

  getDates() {
    return this.days;
  }

  goingMorning(date: string) {
    this.calendarService.goingToClass(date, this.user_id, 'morning');

    // Updating the days array
    this.days.map(day => {
      if (day.date === date) {
        day.morning_count += 1;
      }
    })

    // Updating the morning attendance array
    const member = this.members.find((member: any) => member.id.toString() === this.user_id.toString());

    // Making a copy of the member object
    const member_copy = {...member};

    // Adding the info to the object
    member_copy.date = date;
    member_copy.going_morning = true;
    member_copy.user_id = this.user_id;
    this.morning_attendance.push(member_copy);

  }

  notGoingMorning(date: string) {
    this.calendarService.toggleAttendance(date, this.user_id, 'morning');

    // Updating the days array
    this.days.map(day => {
      if (day.date === date) {
        day.morning_count -= 1;
      }
    })

    // Omtting the given user from the morning attendance array
    this.morning_attendance = this.morning_attendance.filter((entry: any) => {
      return !((entry.date === date) && (entry.user_id.toString() === this.user_id.toString()))
    })
  }

  goingEvening(date: string) {
    this.calendarService.goingToClass(date, this.user_id, 'evening');

    // Updating the days array
    this.days.map(day => {
      if (day.date === date) {
        day.evening_count += 1;
      }
    })

    // Extracting the member in question
    const member = this.members.find((member: any) => member.id.toString() === this.user_id.toString());

    // Copying the member object
    const member_copy = {...member};

    // Adding the date to the member element
    member_copy.date = date;
    member_copy.going_evening = true;
    member_copy.user_id = this.user_id;
    this.evening_attendance.push(member_copy);
  }

  getMorningAttendanceUsers(date: string) {
    return this.morning_attendance.filter((entry: any) => entry.date === date)
  }

  getEveningAttendanceUsers(date: string) {
    return this.evening_attendance.filter((entry: any) => entry.date === date);
  }

  notGoingEvening(date: string) {
    this.calendarService.toggleAttendance(date, this.user_id, 'evening');

    // Updating the days array
    this.days.map(day => {
      if (day.date === date) {
        day.evening_count -= 1;
      }
    })

    // Omtting the given user from the evening attendance array
    this.evening_attendance = this.evening_attendance.filter((entry: any) => {
      return !((entry.date === date) && (entry.user_id.toString() === this.user_id.toString()))
    })
  }

  isUserGoingMorning(date: string) {
    const entry = this.morning_attendance.find((entry: any) => {
      return (entry.date === date) && (entry.user_id.toString() === this.user_id.toString())
    });
    return entry ? true : false;
  }

  isUserGoingEvening(date: string) {
    const entry = this.evening_attendance.find((entry: any) => {
      return (entry.date === date) && (entry.user_id.toString() === this.user_id.toString())
    });
    return entry ? true : false;
  }

}
