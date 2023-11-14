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
import {MoviesService} from "../../Service/MovieList/movies.service";

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


  protected readonly faFileLines = faFileLines;
  protected readonly faFireFlameCurved = faFireFlameCurved;
  protected readonly faRightFromBracket = faRightFromBracket;
  protected readonly faStar = faStar;
  protected readonly faRankingStar = faRankingStar;
  protected readonly faTicket = faTicket;
  protected readonly faSquareCheck = faSquareCheck;

  isFavoriteClass = '';
  isMustSeeClass = '';
  isSeenClass = '';
  months = ["Jan", "Feb", "Mar", "Apr","May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec",]



  constructor(private route: ActivatedRoute, private movie : MovieDetailService, public service : MoviesService) {
    this.movieDetail$ =  movie.getDataMovieDetail(this.movieId);
    this.route.params.subscribe(params => {
      this.movieId = params['id'];
      this.tvShowId = params['id'];
      movie?.getDataMovieDetail(this.movieId)?.subscribe(movie => {
        this.movieDetail = movie;
        this.initializeFromLocalStorage();
      })
      if(this.tvShowId != undefined){
        movie?.getDataTvShowsDetail(this.tvShowId)?.subscribe(tvShow => {
          this.tvShowDetail = tvShow;
          console.log(this.tvShowDetail)
        })
      }
    });
  }

  private initializeFromLocalStorage() {
    // Vérifie si this.movie existe avant d'effectuer des opérations sur ses propriétés
      const movieState = localStorage.getItem(String(this.movieId)+"M");
      const tvShowState = localStorage.getItem(String(this.tvShowId)+"TVS");
      if (movieState === "favorite" || tvShowState === "favorite") {
        this.isFavoriteClass = 'icon-favorite';
      } else if (movieState === "mustSee" || tvShowState === "mustSee") {
        this.isMustSeeClass = 'icon-favorite';
      } else if (movieState === "seen" || tvShowState === "seen") {
        this.isMustSeeClass = 'icon-favorite';
      }else {
        this.isFavoriteClass = 'icon-not-favorite';
      }
  }

  stateFavorite(movieId: number | undefined){
    if(movieId != undefined){
      if(this.isFavoriteClass == 'icon-favorite'){
        this.isFavoriteClass = 'icon-not-favorite fa-fade';
        setTimeout(() => {
          this.isFavoriteClass = "icon-not-favorite";
        }, 1000);
        if(this.movieDetail == undefined){
          localStorage.removeItem(String(this.tvShowId)+"TVS");
        }else if(this.tvShowDetail == undefined){
          localStorage.removeItem(String(this.movieId)+"M");
        }
      }

      if(this.isFavoriteClass == 'icon-not-favorite'){
        this.isFavoriteClass = 'icon-favorite fa-beat';
        this.isSeenClass = "icon-not-favorite";
        this.isMustSeeClass = "icon-not-favorite";
        setTimeout(() => {
          this.isFavoriteClass = "icon-favorite";
        }, 1000);
        if(this.movieDetail == undefined){
          localStorage.setItem(String(this.tvShowId)+"TVS","favorite")
        }else if(this.tvShowDetail == undefined){
          localStorage.setItem(String(this.movieId)+"M","favorite")
        }
      }
    }
  }

  stateMustSee(movieId: number | undefined){
    if(movieId != undefined){
      if(this.isMustSeeClass == 'icon-favorite'){
        this.isMustSeeClass = 'icon-not-favorite fa-shake'
        setTimeout(() => {
          this.isMustSeeClass = "icon-not-favorite";
        }, 1000);
        if(this.movieDetail == undefined){
          localStorage.removeItem(String(this.tvShowId)+"TVS");
        }else if(this.tvShowDetail == undefined){
          localStorage.removeItem(String(this.movieId)+"M");
        }

      }else {
        this.isMustSeeClass = 'icon-favorite fa-shake'
        this.isFavoriteClass = "icon-not-favorite";
        this.isSeenClass = "icon-not-favorite";
        setTimeout(() => {
          this.isMustSeeClass = "icon-favorite";
        }, 1000);
        if(this.movieDetail == undefined){
          localStorage.setItem(String(this.tvShowId)+"TVS","mustSee")
        }else if(this.tvShowDetail == undefined){
          localStorage.setItem(String(this.movieId)+"M","mustSee")
        }
      }
    }
  }

  stateSeen(movieId: number | undefined){
    if(this.isSeenClass == 'icon-favorite'){
      this.isSeenClass = "icon-not-favorite fa-flip";
      setTimeout(() => {
        this.isSeenClass = "icon-not-favorite";
      }, 1000);
      if(this.movieDetail == undefined){
        localStorage.removeItem(String(this.tvShowId)+"TVS");
      }else if(this.tvShowDetail == undefined){
        localStorage.removeItem(String(this.movieId)+"M");
      }
    }else{
      this.isSeenClass = "icon-favorite fa-flip";
      this.isFavoriteClass = "icon-not-favorite";
      this.isMustSeeClass = "icon-not-favorite";
      setTimeout(() => {
        this.isSeenClass = "icon-favorite";
      }, 1000);
      if(this.movieDetail == undefined){
        localStorage.setItem(String(this.tvShowId)+"TVS","seen")
      }else if(this.tvShowDetail == undefined){
        localStorage.setItem(String(this.movieId)+"M","seen")
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
}
