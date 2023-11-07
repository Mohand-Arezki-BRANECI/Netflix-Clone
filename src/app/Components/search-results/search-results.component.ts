import { Component } from '@angular/core';
import {Movie} from "../../Model/movie";
import {MoviesService} from "../../Service/MovieList/movies.service";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {

  searchResults: Movie | undefined;

  constructor(private movie : MoviesService) {
    this.movie.getMessage().subscribe(films => {
      this.searchResults = films;
      console.log("films ::::::::::::::::::::::: ", this.searchResults);
    })
  }

}
