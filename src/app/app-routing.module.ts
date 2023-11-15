import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignUpComponent} from "./Components/sign-up/sign-up.component";
import {SignInComponent} from "./Components/sign-in/sign-in.component";
import {HomepageComponent} from "./Components/homepage/homepage.component";
import {MoviesComponent} from "./Components/movies/movies.component";
import {TvshowsComponent} from "./Components/tvshows/tvshows.component";
import {MovieDetailsComponent} from "./Components/movie-details/movie-details.component";
import {SearchResultsComponent} from "./Components/search-results/search-results.component";
import {MyspaceComponent} from "./Components/myspace/myspace.component";
import {Error404Component} from "./Components/error404/error404.component";


const routes: Routes = [
  { path: '', redirectTo:"/sign_in", pathMatch:"full"},
  { path: 'homepage', component: HomepageComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'tvshows', component: TvshowsComponent },
  { path: 'sign_up', component: SignUpComponent },
  { path: 'sign_in', component: SignInComponent },
  { path: 'movie_details/:id', component: MovieDetailsComponent },
  { path: 'search_results', component: SearchResultsComponent },
  { path: 'myspace', component: MyspaceComponent },
  { path: '**', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
