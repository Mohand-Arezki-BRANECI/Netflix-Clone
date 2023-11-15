import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Movies} from "../../Model/movie";
import {DetailsService} from "../../Service/DetailsMovieTvShow/details.service";
import {
  faFileLines,
  faFireFlameCurved,
  faRankingStar, faRightFromBracket,
  faSquareCheck,
  faStar,
  faTicket
} from "@fortawesome/free-solid-svg-icons";
import {TvShows} from "../../Model/tvShow";
import {ListService} from "../../Service/ListMoviesTvShows/list.service";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent{
  protected movieId !: String ;
  protected movieDetail ?: Movies ;
  protected tvShowId : String = '';
  protected tvShowDetail? : TvShows;
  protected readonly faFileLines : IconDefinition = faFileLines;
  protected readonly faFireFlameCurved: IconDefinition = faFireFlameCurved;
  protected readonly faRightFromBracket: IconDefinition = faRightFromBracket;
  protected readonly faStar: IconDefinition = faStar;
  protected readonly faRankingStar: IconDefinition = faRankingStar;
  protected readonly faTicket: IconDefinition = faTicket;
  protected readonly faSquareCheck: IconDefinition = faSquareCheck;

  protected isFavoriteClass: string = 'icon-not-favorite';
  protected isMustSeeClass: string = 'icon-not-favorite';
  protected isSeenClass: string = 'icon-not-favorite';
  private months: string[] = ["Jan", "Feb", "Mar", "Apr","May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec",]

  constructor(private route: ActivatedRoute, private movie : DetailsService, public service : ListService) {
    this.route.params.subscribe(params => {
      this.movieId = params['id'];
      this.tvShowId = params['id'];
      if(this.movieId != undefined){
      movie?.getDataMovieDetail(this.movieId)?.subscribe(movie => {
        this.movieDetail = movie;
        this.initializeFromLocalStorage();
      })}
      if(this.tvShowId != undefined){
        movie?.getDataTvShowsDetail(this.tvShowId)?.subscribe(tvShow => {
          this.tvShowDetail = tvShow;
        })
      }
    });
  }

  private initializeFromLocalStorage() : void {
      const movieState : string | null = localStorage.getItem(String(this.movieId)+"M");
      const tvShowState : string | null = localStorage.getItem(String(this.tvShowId)+"TVS");
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

  protected stateFavorite(movieId: number | undefined) : void{
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

  protected stateMustSee(movieId: number | undefined) : void{
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

  protected stateSeen() : void{
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
      setTimeout(() : void => {
        this.isSeenClass = "icon-favorite";
      }, 1000);
      if(this.movieDetail == undefined){
        localStorage.setItem(String(this.tvShowId)+"TVS","seen")
      }else if(this.tvShowDetail == undefined){
        localStorage.setItem(String(this.movieId)+"M","seen")
      }
    }
  }

  protected changeFormatDate(ymd: string | undefined):String{
    if(ymd == undefined){
      return "";
    }else{
      return ymd.split("-")[2] + " " + this.months[parseInt(ymd.split("-")[1])] + " " + ymd.split("-")[0]
    }
  }
}
