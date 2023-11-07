import {Component} from '@angular/core';
import {MoviesService} from '../../Service/movies.service'
import {Movie} from "../../Model/movie";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent {
  movies : Movie | undefined;
  receivedMovies: Movie | undefined;

  constructor(private movie : MoviesService) {
    this.movie.getData().subscribe(data => {
      this.movies = data;
      console.log("the movies fetched from movies : ", this.movies)
    })
     this.movie.getMessage().subscribe(films =>{
      this.receivedMovies = films;
      console.log("films ::::::::::::::::::::::: " , this.receivedMovies);
    })

  }











}
