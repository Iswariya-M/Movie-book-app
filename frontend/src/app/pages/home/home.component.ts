import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  recommendedMovies: any[] = [];
  nowShowingMovies: any[] = [];
  carouselImages!: any[];
  currentSlide: number = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
    
    this.recommendedMovies = [
      { 
        id: 1,
        title: 'manjummel boys',
        imageUrl: "../../../assets/image1.jpg",
        genre: 'Drama',
        rating: 8.5
      },
      { 
        id: 2,
        title: 'DeAr',
        imageUrl: "../../../assets/image2.jpg",
        genre: 'Romance',
        rating: 8.5
      },
      { 
        id: 3,
        title: 'The Family Star',
        imageUrl: "../../../assets/image.avif",
        genre: 'Drama',
        rating: 8.5
      },
      { 
        id: 8,
        title: 'Master',
        imageUrl: "../../../assets/image7.jpg",
        genre: 'Action',
        rating: 8.5
      },
      
    ];

    
    this.nowShowingMovies = [
      { 
        id: 4,
        title: 'Premalu',
        imageUrl: "../../../assets/image3.jpg",
        genre: 'Romance',
        rating: 7.1
      },
      { 
        id:5,
        title: 'Ghilli',
        imageUrl: "../../../assets/image4.jfif",
        genre: 'Action',
        rating: 7.1
      },
      { 
        id:6,
        title: 'Rathnam',
        imageUrl: "../../../assets/image 5.jpg",
        genre: 'Drama',
        rating: 7.1
      },
      { 
        id:7,
        title: 'GODZILLA X KONG : THE NEW EMPIRE',
        imageUrl: "../../../assets/image6.jfif",
        genre: 'Horror',
        rating: 7.1
      },
      
    ];

    this.carouselImages = [
      { url: '../../../assets/slide 4.jpg' },
      { url: '../../../assets/slide 2.jpg' },
      { url: '../../../assets/slide 1.jpg' },
      { url: '../../../assets/slide 3.jpg' }
    ];
  }

 
  goToMovieDetails(id: number): void {
    this.router.navigate(['/movie', id]);
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide === 0) ? this.carouselImages.length - 1 : this.currentSlide - 1;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide === this.carouselImages.length - 1) ? 0 : this.currentSlide + 1;
  }

  getTransformStyle() {
    return `translateX(-${this.currentSlide * 100}%)`;
  }
  
}