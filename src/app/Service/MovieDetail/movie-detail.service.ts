import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Movies} from "../../Model/movie";
import {TvShows} from "../../Model/tvShow";

@Injectable({
  providedIn: 'root'
})
export class MovieDetailService {

  constructor(private httpClient : HttpClient) { }
  getDataMovieDetail(movieId: String){
    let url: string = "https://api.themoviedb.org/3/movie/"+movieId+"?api_key=8533b88dff19fcc27387128cb32d9614";
    return this.httpClient.get<Movies>(url);
  }

  getDataTvShowsDetail(tvShowId: String){
    let url: string = "https://api.themoviedb.org/3/tv/"+tvShowId+"?api_key=8533b88dff19fcc27387128cb32d9614";
    return this.httpClient.get<TvShows>(url);
  }


}

