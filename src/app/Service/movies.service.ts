import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Movie} from "../Model/movie";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private httpClient : HttpClient) { }
  getData(){
    let url: string = "https://api.themoviedb.org/3/discover/movie?api_key=5a26726d5a44298c7d75f5cb0dec5252";
    return this.httpClient.get<Movie>(url);
  }
}
