import {Component, Input} from '@angular/core';
import {Movies} from "../../Model/movie";
import { faStar} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {TvShows} from "../../Model/tvShow";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
    @Input() movie : Movies | undefined
    @Input() tvShow : TvShows | undefined
    @Input() searchResult : Movies | undefined

  protected readonly faStar = faStar;
  isFavoriteClass = 'icon-favorite';
  date : string = '';
  months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec", ]

  constructor(private router: Router) {}


  addToFavorite(movieId: number | undefined){
      if(this.isFavoriteClass == 'icon-favorite'){
        this.isFavoriteClass = "icon-not-favorite";
        localStorage.removeItem(String(movieId));
      }else{
        this.isFavoriteClass = "icon-favorite";
        localStorage.setItem(String(movieId),"favorite");
      }
    }

  changeFormatDate(ymd: string | undefined):String{
    if(ymd == undefined){
      return "";
    }else{
      return ymd.split("-")[2] + " " + this.months[parseInt(ymd.split("-")[1])-1] + " " + ymd.split("-")[0]
    }
  }

  navigateToDetail() {
    this.router.navigate(['/movie_details', this.movie?.id]).then();
  }

    navigateToTvShowDetail() {
        this.router.navigate(['/movie_details', this.tvShow?.id]).then();
    }

}
