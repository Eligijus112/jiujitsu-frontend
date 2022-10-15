// Injectable class
import { Injectable, OnInit } from '@angular/core';

// Importing the HttpClient module
import { HttpClient } from '@angular/common/http';

// ENV variables
import { environment } from "../../environments/environment";

// Login service
import { LoginService } from '../login/login.service';

// Observer object for the calendar
import { Subject } from 'rxjs';

// Modals
import Swal from 'sweetalert2';

// Defining the backend URL
const BACKEND_URL = environment.apiUrl + '/calendar';

@Injectable({providedIn: "root"})
export class CalendarService {

  calendar = new Subject<[]>();
  morningGoers = new Subject<[]>();
  eveningGoers = new Subject<[]>();

  constructor(
    private http: HttpClient,
    private loginService: LoginService
    ) { }

  autoAuthUser() {
    return this.loginService.autoAuthUser();
  }

  getUserId() {
    return this.loginService.getUserId();
  }

  getCalendar(start_date: string, end_date: string) {
    // Sending the get request
    return this.http.get(BACKEND_URL, {'params': {'start': start_date, 'end': end_date}}).
    subscribe((data: any) => {
      this.calendar.next(data);
    });
  }

  getCalendarObservable() {
    return this.calendar.asObservable();
  }

  goingToClass(date: string, user_id: number, part_of_day: string) {
    // Creating the form data for the post request
    const formData = new FormData();

    // Adding the date and user_id to the form data
    formData.append('date', date);
    formData.append('user_id', user_id.toString());
    formData.append('part_of_day', part_of_day);

    // Sending the post request
    return this.http.post(BACKEND_URL + '/addEntry', formData)
    .subscribe((data: any) => {
      if (data.status_code == 201){
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Successfully added to the calendar',
          showConfirmButton: false,
          timer: 3000
        })
      }
    });
  }

  getMorningGoersObservable() {
    return this.morningGoers.asObservable();
  }

  getMorningGoers(start_date: string, end_date: string){
    // Sending the get request
    return this.http.get(BACKEND_URL + '/morning', {'params': {'start': start_date, 'end': end_date}})
    .subscribe((data: any) => {
      this.morningGoers.next(data);
    });
  }

  getEveningGoersObservable() {
    return this.eveningGoers.asObservable();
  }

  getEveningGoers(start_date: string, end_date: string){
    // Sending the get request
    return this.http.get(BACKEND_URL + '/evening', {'params': {'start': start_date, 'end': end_date}})
    .subscribe((data: any) => {
      this.eveningGoers.next(data);
    });
  }

}

// Exporting the class
export default CalendarService;
