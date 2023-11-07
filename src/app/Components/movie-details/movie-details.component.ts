import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Movie, Movies} from "../../Model/movie";
import {MovieDetailService} from "../../Service/MovieDetail/movie-detail.service";
import {faRankingStar, faStar} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent {
  movieId : String = '';
  movieDetail? : Movies | undefined | null;
  movieTitle:String = ''
  protected readonly faStar = faStar;
  isFavoriteClass = 'icon-favorite';
  months = ["Jan", "Fév", "Mars", "Avr", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc", ]


  constructor(private route: ActivatedRoute, private movie : MovieDetailService) {
    this.route.params.subscribe(params => {
      this.movieId = params['id'];
      movie?.getDataMovieDetail(this.movieId)?.subscribe(movie => {
        this.movieDetail = movie;
        console.log(this.movieDetail)
      })
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
