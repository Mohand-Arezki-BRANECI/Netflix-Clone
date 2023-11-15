import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Movies} from "../../Model/movie";
import {TvShows} from "../../Model/tvShow";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  apiKey:string;
  constructor(private httpClient : HttpClient) {
    this.apiKey = "5a26726d5a44298c7d75f5cb0dec5252";
  }
  public getDataMovieDetail(movieId: String) : Observable<Movies>{
    let url: string = "https://api.themoviedb.org/3/movie/"+movieId+"?api_key="+this.apiKey;
    return this.httpClient.get<Movies>(url);
  }

  public getDataTvShowsDetail(tvShowId: String) : Observable<TvShows>{
    let url: string = "https://api.themoviedb.org/3/tv/"+tvShowId+"?api_key="+this.apiKey;
    return this.httpClient.get<TvShows>(url);
  }


}

