import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Movie} from "../../Model/movie";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  apiKey:string;
  searchUrl:string;
  public isMovie!: boolean;

  private movieSubject: BehaviorSubject<Movie | undefined>;
  private readonly movieObservable$: Observable<Movie | undefined>;

  private stringSubject: BehaviorSubject<string | undefined>;
  private stringObservable$: Observable<string | undefined>;


  constructor(private httpClient : HttpClient) {
    this.movieSubject = new BehaviorSubject<Movie | undefined>(undefined);
    this.movieObservable$ = this.movieSubject.asObservable();

    this.stringSubject = new BehaviorSubject<string | undefined>('');
    this.stringObservable$ = this.stringSubject.asObservable();

    this.apiKey = "5a26726d5a44298c7d75f5cb0dec5252";
    this.searchUrl = "https://api.themoviedb.org/3/search/multi?api_key="+this.apiKey;
  }
  getDataFromSearch(searchQuery : string) : Observable<Movie>{
    let url : string = this.searchUrl + `&query=${searchQuery}&page=1&include_adult=false`;
    return this.httpClient.get<Movie>(url);
  }
  sendMessage(movieToSend: Movie) : void {
    this.movieSubject.next(movieToSend);
  }
  getMessage(): Observable<Movie |undefined> {
    return this.movieObservable$;
  }

}
