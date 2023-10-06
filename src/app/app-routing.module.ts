import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./Components/Pages/homepage/homepage.component";
import {MoviesComponent} from "./Components/Pages/movies/movies.component";
import {TvshowsComponent} from "./Components/Pages/tvshows/tvshows.component";
import {MyspaceComponent} from "./Components/Pages/myspace/myspace.component";

const routes: Routes = [
  { path: '', redirectTo:"/homepage", pathMatch:"full"},
  { path: 'homepage', component: HomepageComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'tvshows', component: TvshowsComponent },
  { path: 'myspace', component: MyspaceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
