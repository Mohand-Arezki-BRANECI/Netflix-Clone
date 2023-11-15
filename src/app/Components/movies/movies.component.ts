import {Component, Input} from '@angular/core';
import {ListService} from '../../Service/ListMoviesTvShows/list.service'
import {Movie} from "../../Model/movie";
import {SearchService} from "../../Service/Search/search.service";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent {
  movies : Movie | undefined;
  receivedMovies: Movie | undefined;
  currentPage: number = 1;
  totalPages: number  = 0;
    @Input() displayPagination: boolean = true;
    constructor(private movie : ListService, private search : SearchService) {
    this.movie.getData(this.currentPage).subscribe(data => {
      this.movies = data;
        this.totalPages = this.movies.total_pages
    })
     this.search.getMessage().subscribe(films =>{
      this.receivedMovies = films;
    })

  }
    loadMovies(page: number) : void {
        this.movie.getData(page).subscribe((data:Movie):void => {
            this.movies = data;
            this.currentPage = data.page;
            this.totalPages = data.total_pages;
            console.log('Movies fetched from page', this.currentPage, this.movies);
        });
    }
    nextPage(): void {
        if (this.currentPage < this.totalPages) {
            this.loadMovies(this.currentPage + 1);
        }
    }
    previousPage():void {
        if (this.currentPage > 1) {
            this.loadMovies(this.currentPage - 1);
        }
    }
}





