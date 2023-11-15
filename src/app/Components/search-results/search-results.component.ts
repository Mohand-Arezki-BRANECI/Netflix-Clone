import { Component } from '@angular/core';
import {Movie} from "../../Model/movie";
import {SearchService} from "../../Service/Search/search.service";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {
  searchResults: Movie | undefined;
  constructor(private movie : SearchService) {
    this.movie.getMessage().subscribe(films => {
      this.searchResults = films;
    })
  }

}
