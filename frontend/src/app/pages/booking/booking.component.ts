
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

type Title = {
  title: string
}
type Theatre={
  theatre:string;
}
type Date={
  date:Date;
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'] 
})
export class BookingComponent implements OnInit {
  // booking: any = {};
  booking = {
    title: '',
    theatre: '',
    date: '',
    seats: 0
  };
  bookings: any[] = [];
  titles: Title[] = [];
  theatres: Theatre[] = [];
  dates: Date[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchTitles();
    this.fetchTheatres();
    this.fetchDates();
    this.getBookings();
  }

  fetchTitles(): void {
    this.http.get<Title[]>('http://localhost:3000/api/titles')
      .subscribe(
        titles => {
          this.titles = titles;
          console.log('Fetched titles:', titles);
        },
        error => {
          console.error('Error fetching titles:', error);
        }
      );
  }
  
  fetchTheatres(): void {
    this.http.get<Theatre[]>('http://localhost:3000/api/theatres')
      .subscribe(
        theatres => {
          this.theatres = theatres;
          console.log('Fetched theatres:', theatres);
        },
        error => {
          console.error('Error fetching theatres:', error);
        }
      );
  }
  
  fetchDates(): void {
    this.http.get<Date[]>('http://localhost:3000/api/dates')
      .subscribe(
        dates => {
          this.dates = dates;
          console.log('Fetched dates:', dates);
        },
        error => {
          console.error('Error fetching dates:', error);
        }
      );
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
  
  submitForm() {
    if (!this.booking.title || !this.booking.theatre || !this.booking.date || !this.booking.seats) {
      alert('Please fill out all fields!');
      return; 
    }

     const selectedDate = new Date(this.booking.date);
  const currentDate = new Date();

  
  if (selectedDate <= currentDate) {
    alert('Please select a date that is today or in the future!');
    return;
  }

    const amount = this.booking.seats * 120;
    this.booking.date = this.booking.date.split("T")[0]

    console.log(this.booking);

    this.http.post('http://localhost:3000/api/submitBooking', this.booking)
      .subscribe(
        (response) => {
          console.log('Booking saved successfully:', response);
          alert('Booking saved successfully!');
          localStorage.setItem('bookingData', JSON.stringify({ ...this.booking, amount }));
          this.router.navigate(['/payment'], { state: { booking: this.booking } });
          // this.clearForm();
        },
        (error) => {
          console.error('Error saving booking:', error);
          alert('Error! Seats and shows not availble');
          // this.clearForm();
        }
      );
  }

  // clearForm() {
  //   this.booking = {};
  // }
}

