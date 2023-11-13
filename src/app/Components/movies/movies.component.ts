import {Component, Input} from '@angular/core';
import {MoviesService} from '../../Service/MovieList/movies.service'
import {Movie} from "../../Model/movie";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent {
  movies : Movie | undefined;
  receivedMovies: Movie | undefined;
  currentPage: number = 1;
  totalPages: number  = 0;
    @Input() displayPagination: boolean = true;
    constructor(private movie : MoviesService) {
    this.movie.getData(this.currentPage).subscribe(data => {
      this.movies = data;
      console.log("the movies fetched from movies : ", this.movies)
        this.totalPages = this.movies.total_pages
    })
     this.movie.getMessage().subscribe(films =>{
      this.receivedMovies = films;
      console.log("films ::::::::::::::::::::::: " , this.receivedMovies);
    })

  }

    loadMovies(page: number) {
        this.movie.getData(page).subscribe((data) => {
            this.movies = data;
            this.currentPage = data.page;
            this.totalPages = data.total_pages;
            console.log('Movies fetched from page', this.currentPage, this.movies);
        });


    }

    nextPage() {

        if (this.currentPage < this.totalPages) {
            this.loadMovies(this.currentPage + 1);
        }

    }

    previousPage() {

        if (this.currentPage > 1) {
            this.loadMovies(this.currentPage - 1);
        }
    }
}





