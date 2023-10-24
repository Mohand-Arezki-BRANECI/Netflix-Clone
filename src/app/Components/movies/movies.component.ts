import { Component } from '@angular/core';
import {MoviesService} from '../../Service/movies.service'
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
      console.warn(data);
      console.log("The fetched data : ", data)
      this.movies = data;
      console.log(this.movies.results[1].title)
      this.movies.results.map(movie  =>{
        console.log(movie.title);
      })
    })
  }

}
