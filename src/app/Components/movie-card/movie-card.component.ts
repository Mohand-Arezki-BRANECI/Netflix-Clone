import {Component, Input, OnInit} from '@angular/core';
import {Movie, Movies} from "../../Model/movie";
import {faMagnifyingGlass, faSquareCheck, faStar, faTicket} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";

import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit{
    @Input() movie : Movies | undefined
    @Input() tvShow : Movies | undefined
    @Input() searchResult : Movies | undefined

  protected readonly faStar = faStar;
  protected readonly faTicket = faTicket;
  protected readonly faSquareCheck = faSquareCheck;

  isFavoriteClass = '';
  isMustSeeClass = '';
  isSeenClass = '';
  date : string = '';
  months = ["Jan", "Feb", "Mar", "Apr","May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]

  constructor(private router: Router) {}

  ngOnInit() {
    this.initializeFromLocalStorage();
  }

  private initializeFromLocalStorage() {
    // Vérifie si this.movie existe avant d'effectuer des opérations sur ses propriétés
    if (this.movie) {
      const movieId = this.movie.id;

      const favorite = localStorage.getItem(String(movieId));
      if (favorite === "favorite") {
        this.isFavoriteClass = 'icon-favorite';
      } else {
        this.isFavoriteClass = 'icon-not-favorite';
      }

      const mustSee = localStorage.getItem(String(movieId));
      if (mustSee === "mustSee") {
        this.isMustSeeClass = 'icon-favorite';
      } else {
        this.isMustSeeClass = 'icon-not-favorite';
      }

      const seen = localStorage.getItem(String(movieId));
      if (seen === "seen") {
        this.isSeenClass = 'icon-favorite';
      } else {
        this.isSeenClass = 'icon-not-favorite';
      }
    }
  }

  addToFavorite(movieId: number | undefined){
    if(movieId != undefined){
      if(this.isFavoriteClass == 'icon-favorite'){
        this.isFavoriteClass = 'icon-not-favorite fa-fade !important';
        setTimeout(() => {
          this.isFavoriteClass = "icon-not-favorite";
          localStorage.removeItem(String(movieId));
        }, 1000);

      }
      if(this.isFavoriteClass == 'icon-not-favorite'){
        this.isFavoriteClass = 'icon-favorite fa-beat !important';
        this.isSeenClass = "icon-not-favorite";
        this.isMustSeeClass = "icon-not-favorite";
        setTimeout(() => {
          this.isFavoriteClass = "icon-favorite";
          this.isSeenClass = "icon-not-favorite";
          this.isMustSeeClass = "icon-not-favorite";
          localStorage.setItem(String(movieId),"favorite")
        }, 1000);

      }
    }
  }

  addToMustSee(movieId: number | undefined){
    if(movieId != undefined){
      if(this.isMustSeeClass == 'icon-favorite'){
        this.isMustSeeClass = 'icon-not-favorite fa-shake !important'
        setTimeout(() => {
          this.isMustSeeClass = "icon-not-favorite";
          localStorage.removeItem(String(movieId));
        }, 1000);

      }else {
        this.isMustSeeClass = 'icon-favorite fa-shake !important'
        this.isFavoriteClass = "icon-not-favorite";
        this.isSeenClass = "icon-not-favorite";
        setTimeout(() => {
          this.isMustSeeClass = "icon-favorite";
          this.isFavoriteClass = "icon-not-favorite";
          this.isSeenClass = "icon-not-favorite";
          localStorage.setItem(String(movieId),"mustSee")
        }, 1000);
      }
    }
  }

  addToSeen(movieId: number | undefined){
    if(this.isSeenClass == 'icon-favorite'){
      this.isSeenClass = "icon-not-favorite fa-flip";
      setTimeout(() => {
        this.isSeenClass = "icon-not-favorite";
        localStorage.removeItem(String(movieId));
      }, 1000);
    }else{
      this.isSeenClass = "icon-favorite fa-flip";
      this.isFavoriteClass = "icon-not-favorite";
      this.isMustSeeClass = "icon-not-favorite";
      setTimeout(() => {
        this.isSeenClass = "icon-favorite";
        this.isFavoriteClass = "icon-not-favorite";
        this.isMustSeeClass = "icon-not-favorite";
        localStorage.setItem(String(movieId),"seen")
      }, 1000);
    }
  }

  changeFormatDate(ymd: string | undefined):String{
    if(ymd == undefined){
      return "";
    }else{
      return ymd.split("-")[2] + " " + this.months[parseInt(ymd.split("-")[1])] + " " + ymd.split("-")[0]
    }
  }

  navigateToDetail() {
    this.router.navigate(['/movie_details', this.movie?.id]).then();
  }

}
