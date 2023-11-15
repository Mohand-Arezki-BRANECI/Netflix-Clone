import {Component, Input, OnInit} from '@angular/core';
import {Movies} from "../../Model/movie";
import {faSquareCheck, faStar, faTicket} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {TvShows} from "../../Model/tvShow";
import {ListService} from "../../Service/ListMoviesTvShows/list.service";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit{
  @Input() movie : Movies | undefined
  @Input() tvShow : TvShows | undefined
  @Input() searchResult : Movies | undefined


  protected readonly faStar : IconDefinition = faStar;
  protected readonly faTicket : IconDefinition = faTicket;
  protected readonly faSquareCheck : IconDefinition = faSquareCheck;

  protected isFavoriteClass : string = 'icon-not-favorite';
  protected isMustSeeClass :string = 'icon-not-favorite';
  protected isSeenClass : string = 'icon-not-favorite ';
  protected date : string = '';
  private months: string [] = ["Jan", "Feb", "Mar", "Apr","May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]

  constructor(private router: Router, private service: ListService) {}
  ngOnInit():void {
    this.initializeFromLocalStorage();
  }
  private initializeFromLocalStorage(): void {
    if(this.movie != undefined){
      const movieState : string | null = localStorage.getItem(String(this.movie.id)+"M");
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
      const tvShowState: string | null = localStorage.getItem(String(this.tvShow.id)+"TVS");
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

  protected addToFavorite(movieId: number | undefined): void{
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
        setTimeout((): void => {
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

  protected addToMustSee(movieId: number | undefined) : void{
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
  protected addToSeen(movieId: number | undefined): void{
    if(this.isSeenClass == 'icon-favorite'){
      this.isSeenClass = "icon-not-favorite fa-flip";
      setTimeout(():void => {
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
      setTimeout((): void => {
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
  protected changeFormatDate(ymd: string | undefined):String{
    if(ymd == undefined || ymd == ""){
      return "No Date Available";
    }else{
      return ymd.split("-")[2] + " " + this.months[parseInt(ymd.split("-")[1])] + " " + ymd.split("-")[0]
    }
  }
  protected navigateToDetail(): void {
    this.service.isMovie = true;
    this.router.navigate(['/movie_details', this.movie?.id]).then();
  }
  protected navigateToTvShowDetail(): void{
    this.service.isMovie = false;
    this.router.navigate(['/movie_details',this.tvShow?.id]).then();
  }
}
