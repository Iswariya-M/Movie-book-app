import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  bookings: any[] = [];
  userBookings: any[] = [];
  booking: any = { seats: {} }; 

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getBookings();
    this.getUserBookings();
  }

  getBookings() {
    
    this.http.get<any[]>('http://localhost:3000/api/bookings')
      .subscribe(
        (response) => {
          this.bookings = response;
          console.log("AVAILABE BOOKINGS: ", this.bookings);
        },
        (error) => {
          console.error('Error retrieving bookings:', error);
        }
      );
  }

  getUserBookings() {
    this.http.get<any[]>('http://localhost:3000/api/userbook')
      .subscribe(
        (response) => {
          this.userBookings = response;
        },
        (error) => {
          console.error('Error retrieving user bookings:', error);
        }
      );
  }

  submitForm() {
    if (!this.booking.title || !this.booking.theatre || !this.booking.date || !this.booking.seats) {
      alert('Please fill out all fields!');
      return; 
    }
    console.log("ADMIN BOOKING: ", this.booking);

    this.http.post('http://localhost:3000/api/bookings', this.booking)
      .subscribe(
        (response) => {
          console.log('Booking saved successfully:', response);
          alert('Booking saved successfully!');
          this.clearForm();
        },
        (error) => {
          console.error('Error saving booking:', error);
        }
      );
  }
  

  clearForm() {
    this.booking = { seats: {} }; 
  }
}
  