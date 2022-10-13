import { Component, OnInit } from '@angular/core';

// Importing the calendar service class
import CalendarService from './calendar.service';

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
          day.morning_count = calendar_entry.morning_sum;
          day.evening_count = calendar_entry.evening_sum;
        }
      })
    });
  }

  totalDays() {
    return this.days.length;
  }

  getDates() {
    return this.days;
  }

  goingMorning(date: string) {
    this.calendarService.goingToClass(date, this.user_id, 'morning');
  }

  goingEvening(date: string) {
    this.calendarService.goingToClass(date, this.user_id, 'evening');
  }

}
