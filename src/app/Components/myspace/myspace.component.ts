import {Component, Input, OnInit} from '@angular/core';
import {Movie} from "../../Model/movie";
import {MoviesService} from "../../Service/MovieList/movies.service";

@Component({
  selector: 'app-myspace',
  templateUrl: './myspace.component.html',
  styleUrls: ['./myspace.component.scss']
})
export class MyspaceComponent implements OnInit{
  favorisFromLocalStorage: number[] = [];
  seenFromLocalStorage: number[] = [];
  mustSeeFromLocalStorage: number[] = [];



  ngOnInit() {
    for (let i = 0; i < localStorage.length; i++) {
      let key:string | null = localStorage.key(i);




      if(key != null) {
        if (localStorage.getItem(key) == "favorite") {
          this.favorisFromLocalStorage.push(parseInt(key));
        } else if (localStorage.getItem(key) == "seen") {
          this.seenFromLocalStorage.push(parseInt(key));
        }
        if (localStorage.getItem(key) == "mustSee") {
          this.mustSeeFromLocalStorage.push(parseInt(key));
        }
      }
    }
    console.log(this.mustSeeFromLocalStorage)
    console.log(this.favorisFromLocalStorage)
    console.log(this.seenFromLocalStorage)
  }
}
