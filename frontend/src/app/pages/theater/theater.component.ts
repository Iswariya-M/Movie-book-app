import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theater',
  templateUrl: './theater.component.html',
  styleUrl: './theater.component.css'
})
export class TheaterComponent implements OnInit {
  theaters: string[] = [];
  selectedTheater: string = 'JANAS';
  theaterDetails: any[] = [];
  selectedTheaterDetails: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchTheaters();
  }

  fetchTheaters() {
    this.http.get<any[]>('http://localhost:3000/api/theatres')
      .subscribe(
        (response) => {
          this.theaters = response.map(data => data.theatre);
          // Ensure "JANAS" is in the list and fetch its details
          if (this.theaters.includes(this.selectedTheater)) {
            this.fetchTheaterDetails();
          }
        },
        (error) => {
          console.error('Error fetching theaters:', error);
          console.log(error);
        }
      );
  }

  selectTheater(theater: string) {
    this.selectedTheater = theater;
    this.fetchTheaterDetails();
  }

  fetchTheaterDetails() {
    this.http.get<any[]>('http://localhost:3000/api/theater-details/' + this.selectedTheater)
      .subscribe(
        (response) => {
          this.theaterDetails = response;
          this.selectedTheaterDetails = this.theaterDetails.filter(detail => detail.theatre === this.selectedTheater);
        },
        (error) => {
          console.error('Error fetching theater details:', error);
        }
      );
  }
}