import { Component } from '@angular/core';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  // Getting the current date
  date = new Date();

  // Saving only the date part
  // (without the time part)
  today = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());

  // Creating a sequence of 7 days in the future
  // (from today to 7 days from today)
  days = Array.from({length: 7}, (v, k) => k + 1).map(day => {
    const date = new Date(this.today);
    date.setDate(date.getDate() + day);
    return date;
  });

  totalDays() {
    return this.days.length;
  }

  getDates() {
    return this.days;
  }

}
