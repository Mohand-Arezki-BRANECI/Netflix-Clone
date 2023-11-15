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
  searchUrl:string;
  public isMovie!: boolean;

  private messageSubject: BehaviorSubject<Movie | undefined>;
  private messageObservable$: Observable<Movie | undefined>;

  private messageSubjecttt: BehaviorSubject<string | undefined>;
  private messageObservablee$: Observable<string | undefined>;


  constructor(private httpClient : HttpClient) {
    this.messageSubject = new BehaviorSubject<Movie | undefined>(undefined);
    this.messageObservable$ = this.messageSubject.asObservable();

    this.messageSubjecttt = new BehaviorSubject<string | undefined>('');
    this.messageObservablee$ = this.messageSubjecttt.asObservable();

    this.apiKey = "5a26726d5a44298c7d75f5cb0dec5252";
    this.searchUrl = "https://api.themoviedb.org/3/search/multi?api_key=5a26726d5a44298c7d75f5cb0dec5252";
  }
  getData(page : number): Observable<Movie>{
    let url: string = "https://api.themoviedb.org/3/discover/movie?api_key=5a26726d5a44298c7d75f5cb0dec5252&page="+page;
    return this.httpClient.get<Movie>(url);
  }
  getTvShows(page: number) : Observable<TvShow>{
    let url: string = "https://api.themoviedb.org/3/discover/tv?api_key=5a26726d5a44298c7d75f5cb0dec5252&page="+page;
    return this.httpClient.get<TvShow>(url);
  }
}
