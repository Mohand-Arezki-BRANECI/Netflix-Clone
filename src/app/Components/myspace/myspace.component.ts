import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MovieDetailService} from "../../Service/MovieDetail/movie-detail.service";
import {Movies} from "../../Model/movie";
import {TvShow, TvShows} from "../../Model/tvShow";

@Component({
  selector: 'app-myspace',
  templateUrl: './myspace.component.html',
  styleUrls: ['./myspace.component.scss']
})
export class MyspaceComponent implements OnInit{
  favoriteFromLocalStorage: String[] = [];
  seenFromLocalStorage: String[] = [];
  mustSeeFromLocalStorage: String[] = [];

  favoriteMovie: Movies[] = [];
  favoriteTvShows: TvShows[] = [];

  mustSeeMovie: Movies[] = [];
  mustSeeTvShows: TvShows[] = [];

  seenMovie: Movies[] = [];
  seenTvShows: TvShows[] = [];

  thisMovie: Movies | undefined;
  thisTvShow: TvShows | undefined;

  constructor(private router: Router, private service:MovieDetailService) { }

  logout() {
    this.router.navigate(['/sign_in']).then(r => true);
  }
  ngOnInit() {
    for (let i = 0; i < localStorage.length; i++) {
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
    for (let f=0; f < this.favoriteFromLocalStorage.length; f++){
      let keyFav = this.favoriteFromLocalStorage[f];
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

    for (let ms=0; ms < this.mustSeeFromLocalStorage.length; ms++){
      let keyMS = this.mustSeeFromLocalStorage[ms];
      if(keyMS != null) {
        if(keyMS.split('M')[0] != keyMS){
          this.service.getDataMovieDetail(keyMS.split('M')[0])
            .subscribe(movie => {
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

    for (let s=0; s < this.seenFromLocalStorage.length; s++){
      console.log(this.seenFromLocalStorage)

      let keyS = this.seenFromLocalStorage[s];
      console.log(keyS)
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

  protected getMovieOf(id:String):Movies | undefined{
    if((id=id.split('M')[0]) == id){
      this.service.getDataMovieDetail(id)
        .subscribe(movie => {
          this.thisMovie = movie;
        });
    }
    if(this.thisMovie)
      return this.thisMovie;
    return undefined;
  }

  protected getTvShowOf(id:String):TvShows | undefined{
    if((id=id.split('TVS')[0]) == id){
      this.service.getDataTvShowsDetail(id)
        .subscribe(tvShow => {
          this.thisTvShow = tvShow;
        });
    }
    if(this.thisTvShow)
      return this.thisTvShow;
    return undefined;
  }


}
