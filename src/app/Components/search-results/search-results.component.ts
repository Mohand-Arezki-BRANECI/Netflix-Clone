import {Component} from '@angular/core';
import {Movies} from "../../Model/movie";
import {SearchService} from "../../Service/Search/search.service";
import {TvShows} from "../../Model/tvShow";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {
  protected searchResultsMovies: Movies[] =[];
  protected searchResultsTvShows: TvShows[] =[];

  constructor(private movie : SearchService) {
    this.movie.getMessage().subscribe(films => {
      console.log(films)

      if(films != undefined){
        for (let i=0; i< films?.results.length; i++) {
          if(films?.results[i].media_type == 'movie'){
            this.searchResultsMovies.push(films?.results[i]);
          }else if(films?.results[i].media_type == 'tv'){
              this.searchResultsTvShows.push(this.addTvShowFromMovie(films?.results[i]));
          }
        }
        console.log(this.searchResultsMovies)
        console.log(this.searchResultsTvShows)
      }
    })
  }

  private addTvShowFromMovie(movie:Movies):TvShows{
    return {
      backdrop_path: movie.backdrop_path,
      first_air_date: '',
      genre_ids: [],
      id: movie.id,
      name: movie.original_title,
      original_country: [],
      original_language: movie.original_language,
      original_name: movie.original_title,
      overview: movie.overview,
      popularity: movie.popularity,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
      media_type: movie.media_type
    };
  }

}
