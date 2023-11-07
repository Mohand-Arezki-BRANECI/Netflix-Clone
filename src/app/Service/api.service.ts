import { Injectable } from '@angular/core';
import { HttpClient }from '@angular/common/http';
import {Observable} from "rxjs";
import {Movie} from "../Model/movie";

@Injectable()
export class ApiService {
/*
  apiKey:string;
  url1:string;
  url2:string;

  constructor(private httpClient : HttpClient) {
    this.apiKey = '5a26726d5a44298c7d75f5cb0dec5252';
    this.url1 = 'https://api.themoviedb.org/3/search/multi?api_key=';
    this.url2 = '&language=en-US&';
  }

  buscarFilm(name:string) {
    let url : string = this.url1 + this.apiKey + this.url2 + `query=${name}&page=1&include_adult=false`;
    return this.httpClient.get<Movie>(url);
  }
*/
}
