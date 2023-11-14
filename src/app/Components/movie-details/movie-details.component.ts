import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Movie, Movies} from "../../Model/movie";
import {MovieDetailService} from "../../Service/MovieDetail/movie-detail.service";
import {
  faFileLines,
  faFireFlameCurved,
  faRankingStar, faRightFromBracket,
  faSquareCheck,
  faStar,
  faTicket
} from "@fortawesome/free-solid-svg-icons";
import {Observable} from "rxjs";
import {TvShows} from "../../Model/tvShow";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent{
  movieId !: String ;
  movieDetail ?: Movies ;
  movieDetail$ !: Observable<Movies> ;
  movieTitle !:String;
  tvShowId : String = '';
  tvShowDetail? : TvShows;

  protected readonly faStar = faStar;
  protected readonly faRankingStar = faRankingStar;
  protected readonly faTicket = faTicket;
  protected readonly faSquareCheck = faSquareCheck;

  isFavoriteClass = '';
  isMustSeeClass = '';
  isSeenClass = '';
  months = ["Jan", "Feb", "Mar", "Apr","May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec",]



  constructor(private route: ActivatedRoute, private movie : MovieDetailService) {
    this.movieDetail$ =  movie.getDataMovieDetail(this.movieId);
    this.route.params.subscribe(params => {
      this.movieId = params['id'];
      movie?.getDataMovieDetail(this.movieId)?.subscribe(movie => {
        this.movieDetail = movie;
        this.initializeFromLocalStorage();
      })
    });
  }

  private initializeFromLocalStorage() {
    // Vérifie si this.movie existe avant d'effectuer des opérations sur ses propriétés
    if (this.movieDetail) {
      const movieId = this.movieId;

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

  stateFavorite(movieId: number | undefined){
    if(movieId != undefined){
      if(this.isFavoriteClass == 'icon-favorite'){
        this.isFavoriteClass = 'icon-not-favorite fa-fade';
        setTimeout(() => {
          this.isFavoriteClass = "icon-not-favorite";
          localStorage.removeItem(String(movieId));
        }, 1000);

      }
      if(this.isFavoriteClass == 'icon-not-favorite'){
        this.isFavoriteClass = 'icon-favorite fa-beat';
        this.isSeenClass = "icon-not-favorite";
        this.isMustSeeClass = "icon-not-favorite";
        setTimeout(() => {
          this.isFavoriteClass = "icon-favorite";
          localStorage.setItem(String(movieId),"favorite")
        }, 1000);

      }
    }
  }

  stateMustSee(movieId: number | undefined){
    if(movieId != undefined){
      if(this.isMustSeeClass == 'icon-favorite'){
        this.isMustSeeClass = 'icon-not-favorite fa-shake'
        setTimeout(() => {
          this.isMustSeeClass = "icon-not-favorite";
          localStorage.removeItem(String(movieId));
        }, 1000);

      }else {
        this.isMustSeeClass = 'icon-favorite fa-shake'
        this.isFavoriteClass = "icon-not-favorite";
        this.isSeenClass = "icon-not-favorite";
        setTimeout(() => {
          this.isMustSeeClass = "icon-favorite";
          localStorage.setItem(String(movieId),"mustSee")
        }, 1000);
      }
    }
  }

  stateSeen(movieId: number | undefined){
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


  protected readonly faFileLines = faFileLines;
  protected readonly faFireFlameCurved = faFireFlameCurved;
  protected readonly faRightFromBracket = faRightFromBracket;
}
