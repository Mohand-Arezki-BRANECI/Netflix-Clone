import { Component } from '@angular/core';
import {MoviesService} from "../../Service/MovieList/movies.service";
import {TvShow} from "../../Model/tvShow";

@Component({
  selector: 'app-tvshows',
  templateUrl: './tvshows.component.html',
  styleUrls: ['./tvshows.component.scss']
})
export class TvshowsComponent {
tvShows : TvShow | undefined;

  constructor(private movie : MoviesService) {
    this.movie.getTvShows().subscribe(data => {
      console.warn(data);
      console.log("The fetched data : ", data)
      this.tvShows = data;
      console.log(this.tvShows.results[1].original_name)
      this.tvShows.results.map(movie  =>{
        console.log(movie.original_name);
      })
    })
  }
}
