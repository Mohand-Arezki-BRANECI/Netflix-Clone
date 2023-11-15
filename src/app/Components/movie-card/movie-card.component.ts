import {Component, Input, OnInit} from '@angular/core';
import {Movies} from "../../Model/movie";
import {faSquareCheck, faStar, faTicket} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";


import {TvShows} from "../../Model/tvShow";
import {MoviesService} from "../../Service/MovieList/movies.service";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit{
  @Input() movie : Movies | undefined
  @Input() tvShow : TvShows | undefined
  @Input() searchResult : Movies | undefined


  protected readonly faStar = faStar;
  protected readonly faTicket = faTicket;
  protected readonly faSquareCheck = faSquareCheck;

  isFavoriteClass = 'icon-not-favorite';
  isMustSeeClass = 'icon-not-favorite';
  isSeenClass = 'icon-not-favorite ';
  date : string = '';
  months = ["Jan", "Feb", "Mar", "Apr","May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]

  constructor(private router: Router, private service: MoviesService) {}

  ngOnInit() {
    this.initializeFromLocalStorage();
  }

  private initializeFromLocalStorage() {
    if(this.movie != undefined){
      const movieState = localStorage.getItem(String(this.movie.id)+"M");
      if (movieState === "favorite") {
        this.isFavoriteClass = 'icon-favorite';
      } else if (movieState === "mustSee") {
        this.isMustSeeClass = 'icon-favorite';
      } else if (movieState === "seen") {
        this.isSeenClass = 'icon-favorite';
      }else {
        this.isFavoriteClass = 'icon-not-favorite';
      }
    }else if(this.tvShow != undefined){
      const tvShowState = localStorage.getItem(String(this.tvShow.id)+"TVS");
      if (tvShowState === "favorite") {
        this.isFavoriteClass = 'icon-favorite';
      } else if (tvShowState === "mustSee") {
        this.isMustSeeClass = 'icon-favorite';
      } else if (tvShowState === "seen") {
        this.isSeenClass = 'icon-favorite';
      }else {
        this.isFavoriteClass = 'icon-not-favorite';
      }
    }
  }

  addToFavorite(movieId: number | undefined){
    if(movieId != undefined){
      if(this.isFavoriteClass == 'icon-favorite'){
        this.isFavoriteClass = 'icon-not-favorite fa-fade !important';
        setTimeout(() => {
          this.isFavoriteClass = "icon-not-favorite";
        }, 1000);
        if(this.movie == undefined){
          localStorage.removeItem(String(movieId)+"TVS");
        }else if(this.tvShow == undefined){
          localStorage.removeItem(String(movieId)+"M");
        }
      }
      if(this.isFavoriteClass == 'icon-not-favorite'){
        this.isFavoriteClass = 'icon-favorite fa-beat !important';
        this.isSeenClass = "icon-not-favorite";
        this.isMustSeeClass = "icon-not-favorite";
        setTimeout(() => {
          this.isFavoriteClass = "icon-favorite";
          this.isSeenClass = "icon-not-favorite";
          this.isMustSeeClass = "icon-not-favorite";
        }, 1000);
        if(this.movie == undefined){
          localStorage.setItem(String(movieId)+"TVS","favorite")
        }else if(this.tvShow == undefined){
          localStorage.setItem(String(movieId)+"M","favorite")
        }

      }
    }
  }

  addToMustSee(movieId: number | undefined){
    if(movieId != undefined){
      if(this.isMustSeeClass == 'icon-favorite'){
        this.isMustSeeClass = 'icon-not-favorite fa-shake !important'
        setTimeout(() => {
          this.isMustSeeClass = "icon-not-favorite";
        }, 1000);
        if(this.movie == undefined){
          localStorage.removeItem(String(movieId)+"TVS");
        }else if(this.tvShow == undefined){
          localStorage.removeItem(String(movieId)+"M");
        }

      }else {
        this.isMustSeeClass = 'icon-favorite fa-shake !important'
        this.isFavoriteClass = "icon-not-favorite";
        this.isSeenClass = "icon-not-favorite";
        setTimeout(() => {
          this.isMustSeeClass = "icon-favorite";
          this.isFavoriteClass = "icon-not-favorite";
          this.isSeenClass = "icon-not-favorite";
        }, 1000);
        if(this.movie == undefined){
          localStorage.setItem(String(movieId)+"TVS","mustSee")
        }else if(this.tvShow == undefined){
          localStorage.setItem(String(movieId)+"M","mustSee")
        }

      }
    }
  }

  addToSeen(movieId: number | undefined){
    if(this.isSeenClass == 'icon-favorite'){
      this.isSeenClass = "icon-not-favorite fa-flip";
      setTimeout(() => {
        this.isSeenClass = "icon-not-favorite";
      }, 1000);
      if(this.movie == undefined){
        localStorage.removeItem(String(movieId)+"TVS");
      }else if(this.tvShow == undefined){
        localStorage.removeItem(String(movieId)+"M");
      }
    }else{
      this.isSeenClass = "icon-favorite fa-flip";
      this.isFavoriteClass = "icon-not-favorite";
      this.isMustSeeClass = "icon-not-favorite";
      setTimeout(() => {
        this.isSeenClass = "icon-favorite";
        this.isFavoriteClass = "icon-not-favorite";
        this.isMustSeeClass = "icon-not-favorite";
      }, 1000);
      if(this.movie == undefined){
        localStorage.setItem(String(movieId)+"TVS","seen")
      }else if(this.tvShow == undefined){
        localStorage.setItem(String(movieId)+"M","seen")
      }
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
    this.service.isMovie = true;
    this.router.navigate(['/movie_details', this.movie?.id]).then();
  }

  navigateToTvShowDetail(){
    this.service.isMovie = false;
    this.router.navigate(['/movie_details',this.tvShow?.id]).then();
  }

}
