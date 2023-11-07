import { Component } from '@angular/core';
import {MoviesService} from "../../Service/MovieList/movies.service";
import {Movie} from "../../Model/movie";

@Component({
  selector: 'app-tvshows',
  templateUrl: './tvshows.component.html',
  styleUrls: ['./tvshows.component.scss']
})
export class TvshowsComponent {
tvShows : Movie | undefined;

  constructor(private movie : MoviesService) {
    this.movie.getTvShows().subscribe(data => {
      console.warn(data);
      console.log("The fetched data : ", data)
      this.tvShows = data;
      console.log(this.tvShows.results[1].title)
      this.tvShows.results.map(movie  =>{
        console.log(movie.title);
      })
    })
  }
}
