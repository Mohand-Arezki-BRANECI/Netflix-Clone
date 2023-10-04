import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./Components/homepage/homepage.component";
import {MoviesComponent} from "./Components/movies/movies.component";
import {TvshowsComponent} from "./Components/tvshows/tvshows.component";

const routes: Routes = [
  { path: '', redirectTo:"/homepage", pathMatch:"full"},
  { path: 'homepage', component: HomepageComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'tvshows', component: TvshowsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
