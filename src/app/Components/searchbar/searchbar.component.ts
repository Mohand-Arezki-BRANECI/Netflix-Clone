import { Component } from '@angular/core';
import {Movie} from "../../Model/movie";
import {Router} from "@angular/router";
import {SearchService} from "../../Service/Search/search.service";

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent {
 constructor(private service : SearchService, private router : Router) {
 }
  private searchRes : Movie | undefined
  protected searchQuery: string ="";
  protected onSubmit(): void {
    if (this.searchQuery != "") {
      this.service.getDataFromSearch(this.searchQuery).subscribe(data => {
        this.searchRes = data;
        if (this.searchRes != null) {
          this.service.sendMessage(this.searchRes);
        }
        this.router.navigate(['/search_results']);
      })
    }
  }
}
