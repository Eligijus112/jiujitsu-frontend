import { Component, OnInit, ViewChild } from '@angular/core';

// Importing the calendar service class
import CalendarService from './calendar.service';

// Accordion
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

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

  constructor (private calendarService: CalendarService) {}

  ngOnInit() {

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
    this.morning_attendance.push({
      date: date,
      user_id: this.user_id
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

    // Updating the evening attendance array
    this.evening_attendance.push({
      date: date,
      user_id: this.user_id
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
