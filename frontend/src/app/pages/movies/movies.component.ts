import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit {
  movies: any[] = [];
  filteredMovies: any[] = [];
  searchQuery: string = '';

  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit(): void {
    this.movies = this.movieService.getAllMovies();
    this.filteredMovies = this.movies; // Initialize filtered movies with all movies
  }

  goToMovieDetails(id: number): void {
    this.router.navigate(['/movie', id]);
  }

  searchMovies(): void {
    if (this.searchQuery.trim() !== '') {
      this.filteredMovies = this.movies.filter(movie =>
        movie.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        movie.genre.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredMovies = this.movies; // Reset to all movies if search query is empty
    }
  }
}
