import { Component } from '@angular/core';
import axios from "axios";


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent {

  url = 'https://api.themoviedb.org/3/movie/changes?page=1';
   options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NTMzYjg4ZGZmMTlmY2MyNzM4NzEyOGNiMzJkOTYxNCIsInN1YiI6IjY1MjAyMjJhM2QzNTU3MDExYzAxMDhkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KMTJYElakpiAVUB6S8TqW38rGj0vBK1Dmy3JLHrQIjc'
    }
  };

  protected async test() {
    fetch(this.url, this.options)
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.error('error:' + err));
  }
}
