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
  getDataFromSearch(searchQuery : string){
    let url : string = this.searchUrl + `&query=${searchQuery}&page=1&include_adult=false`;
    return this.httpClient.get<Movie>(url);
  }
  sendMessage(movieToSend: Movie) : void {
    this.messageSubject.next(movieToSend);
  }
  getMessage(): Observable<Movie |undefined> {
    return this.messageObservable$;
  }

}
