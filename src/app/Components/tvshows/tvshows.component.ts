import {Component, Input} from '@angular/core';
import {ListService} from "../../Service/ListMoviesTvShows/list.service";
import {TvShow} from "../../Model/tvShow";
@Component({
  selector: 'app-tvshows',
  templateUrl: './tvshows.component.html',
  styleUrls: ['./tvshows.component.scss']
})
export class TvshowsComponent {
  protected tvShows : TvShow | undefined;
  protected currentPage: number = 1;
  protected totalPages: number  = 0;
@Input() displayPagination: boolean = true;
  constructor(private movie : ListService) {
    this.movie.getTvShows(this.currentPage).subscribe(data => {
      console.warn(data);
      console.log("The fetched data : ", data)
      this.tvShows = data;
      this.totalPages = this.tvShows.total_pages;
    })
  }
  private loadTvShows(page: number) : void {
    this.movie.getTvShows(page).subscribe((data) => {
      this.tvShows = data;
      this.currentPage = data.page;
      this.totalPages = data.total_pages;
    });
  }
  protected nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.loadTvShows(this.currentPage + 1);
    }
  }
  protected previousPage(): void {
    if (this.currentPage > 1) {
      this.loadTvShows(this.currentPage - 1);
    }
  }
}
