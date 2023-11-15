import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DetailsService} from "../../Service/DetailsMovieTvShow/details.service";
import {Movies} from "../../Model/movie";
import {TvShows} from "../../Model/tvShow";

@Component({
  selector: 'app-myspace',
  templateUrl: './myspace.component.html',
  styleUrls: ['./myspace.component.scss']
})
export class MyspaceComponent implements OnInit{
  protected favoriteFromLocalStorage: String[] = [];
  protected seenFromLocalStorage: String[] = [];
  protected mustSeeFromLocalStorage: String[] = [];
  protected favoriteMovie: Movies[] = [];
  protected favoriteTvShows: TvShows[] = [];
  protected mustSeeMovie: Movies[] = [];
  protected mustSeeTvShows: TvShows[] = [];
  protected seenMovie: Movies[] = [];
  protected seenTvShows: TvShows[] = [];

  constructor(private router: Router, private service:DetailsService) { }

  protected logout():void {
    this.router.navigate(['/sign_in']).then();
  }
  ngOnInit():void {
    for (let i: number = 0; i < localStorage.length; i++) {
      let key:string | null = localStorage.key(i);
      if(key != null) {
        if (localStorage.getItem(key) == "favorite") {
          this.favoriteFromLocalStorage.push(key);
        } else if (localStorage.getItem(key) == "seen") {
          this.seenFromLocalStorage.push(key);
        }else if (localStorage.getItem(key) == "mustSee") {
          this.mustSeeFromLocalStorage.push(key);
        }
      }
    }
    for (let f: number= 0; f < this.favoriteFromLocalStorage.length; f++){
      let keyFav : String = this.favoriteFromLocalStorage[f];
      if(keyFav != null) {
        if(keyFav.split('M')[0] != keyFav){
          this.service.getDataMovieDetail(keyFav.split('M')[0])
            .subscribe(movie => {
              this.favoriteMovie.push(movie);
            });
        }else if(keyFav.split('TVS')[0] != keyFav){
          this.service.getDataTvShowsDetail(keyFav.split('TVS')[0])
            .subscribe(tvShow => {
              this.favoriteTvShows.push(tvShow);
            });
        }
      }
    }

    for (let ms : number=0; ms < this.mustSeeFromLocalStorage.length; ms++){
      let keyMS: String = this.mustSeeFromLocalStorage[ms];
      if(keyMS != null) {
        if(keyMS.split('M')[0] != keyMS){
          this.service.getDataMovieDetail(keyMS.split('M')[0])
            .subscribe(movie  => {
              this.mustSeeMovie.push(movie);
            });
        }else if(keyMS.split('TVS')[0] != keyMS){
          this.service.getDataTvShowsDetail(keyMS.split('TVS')[0])
            .subscribe(tvShow => {
              this.mustSeeTvShows.push(tvShow);
            });
        }
      }
    }
    for (let s: number=0; s < this.seenFromLocalStorage.length; s++){
      let keyS :String = this.seenFromLocalStorage[s];
      if(keyS != null) {
        if(keyS.split('M')[0] != keyS){
          this.service.getDataMovieDetail(keyS.split('M')[0])
            .subscribe(movie => {
              this.seenMovie.push(movie);
            });
        }else if(keyS.split('TVS')[0] != keyS){
          this.service.getDataTvShowsDetail(keyS.split('TVS')[0])
            .subscribe(tvShow => {
              this.seenTvShows.push(tvShow);
            });
        }
      }
    }
  }
}
