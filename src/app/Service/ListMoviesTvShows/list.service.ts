import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Movie} from "../../Model/movie";
import {BehaviorSubject, Observable} from "rxjs";
import {TvShow} from "../../Model/tvShow";
@Injectable({
  providedIn: 'root'
})
export class ListService {
  apiKey:string;
  public isMovie!: boolean;

  constructor(private httpClient : HttpClient) {
    this.apiKey = "5a26726d5a44298c7d75f5cb0dec5252";
  }
  getData(page : number): Observable<Movie>{
    let url: string = "https://api.themoviedb.org/3/discover/movie?api_key="+this.apiKey+"&page="+page;
    return this.httpClient.get<Movie>(url);
  }
  getTvShows(page: number) : Observable<TvShow>{
    let url: string = "https://api.themoviedb.org/3/discover/tv?api_key="+this.apiKey+"&page="+page;
    return this.httpClient.get<TvShow>(url);
  }
}
