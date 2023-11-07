import { Component } from '@angular/core';
import {MoviesService} from '../../Service/MovieList/movies.service'
import {Movie} from "../../Model/movie";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent {
  movies : Movie | undefined;
  constructor(private movie : MoviesService) {
    this.movie.getData().subscribe(data => {
      console.log("The fetched data : ", data)
      this.movies = data;
    })
  }

}
