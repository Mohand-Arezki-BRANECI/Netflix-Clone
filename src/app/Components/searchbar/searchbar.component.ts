import { Component } from '@angular/core';
import {Movie} from "../../Model/movie";
import {MoviesService} from "../../Service/MovieList/movies.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent {

 constructor(private service : MoviesService, private router : Router) {
 }
  searchRes : Movie | undefined
  searchQuery: string ="";
  onSubmit() {
    console.log(this.searchQuery);
    this.service.getDataFromSearch(this.searchQuery).subscribe(data => {
      this.searchRes = data;
      if(this.searchRes != null){
        console.log("not nulll")
        this.service.sendMessage(this.searchRes);
      }
      console.log("THE DATA RETURNED FROM THE SEARCH QUERY ! ", data);
      this.router.navigate(['/search_results']);
    })
  }
}
