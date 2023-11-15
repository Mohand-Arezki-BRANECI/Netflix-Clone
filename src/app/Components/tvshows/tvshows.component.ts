import {Component, Input} from '@angular/core';
import {ListService} from "../../Service/ListMoviesTvShows/list.service";
import {TvShow} from "../../Model/tvShow";

@Component({
  selector: 'app-tvshows',
  templateUrl: './tvshows.component.html',
  styleUrls: ['./tvshows.component.scss']
})
export class TvshowsComponent {
tvShows : TvShow | undefined;
  currentPage: number = 1;
  totalPages: number  = 0;
@Input() displayPagination: boolean = true;
  constructor(private movie : ListService) {
    this.movie.getTvShows(this.currentPage).subscribe(data => {
      console.warn(data);
      console.log("The fetched data : ", data)
      this.tvShows = data;
      console.log(this.tvShows.results[1].original_name);
      this.totalPages = this.tvShows.total_pages

      this.tvShows.results.map(movie  =>{
        console.log(movie.original_name);
      })
    })
  }
  loadMovies(page: number) {
    this.movie.getTvShows(page).subscribe((data) => {
      this.tvShows = data;
      this.currentPage = data.page;
      this.totalPages = data.total_pages;
      console.log('Movies fetched from page', this.currentPage, this.tvShows);
    });
  }
  nextPage() {

    if (this.currentPage < this.totalPages) {
      this.loadMovies(this.currentPage + 1);
    }

  }

  previousPage() {

    if (this.currentPage > 1) {
      this.loadMovies(this.currentPage - 1);
    }
  }
}
