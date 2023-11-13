import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Movies} from "../../Model/movie";
import {MovieDetailService} from "../../Service/MovieDetail/movie-detail.service";
import {faRankingStar, faStar, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {TvShows} from "../../Model/tvShow";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent {
  movieId : String = '';
  movieDetail? : Movies | undefined;
  tvShowId : String = '';
  tvShowDetail? : TvShows;
  movieTitle:String = ''
  protected readonly faStar: IconDefinition  = faStar;
  isFavoriteClass = 'icon-favorite';
  months = ["Jan", "Feb", "March", "Avr", "May", "June", "Juil", "Août", "Sept", "Oct", "Nov", "Déc", ]


  constructor(private route: ActivatedRoute, private movie : MovieDetailService) {
    this.route.params.subscribe(params => {
      this.tvShowId= params['id'];
      this.movieId = params['id'];
      if(this.movieId != undefined){
        movie?.getDataMovieDetail(this.movieId)?.subscribe(movie => {
          this.movieDetail = movie;
          console.log(this.movieDetail)
        })
      }
      if(this.tvShowId != undefined){
        movie?.getDataTvShowsDetail(this.tvShowId)?.subscribe(movie => {
          this.tvShowDetail = movie;
          console.log(this.tvShowDetail)
        })
      }''
    });
  }

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
      return ymd.split("-")[2] + " " + this.months[parseInt(ymd.split("-")[1])] + " " + ymd.split("-")[0]
    }
  }


  protected readonly faRankingStar = faRankingStar;
}
