import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { MoviesComponent } from './Components/movies/movies.component';
import { TvshowsComponent } from './Components/tvshows/tvshows.component';
import { HomepageComponent } from './Components/homepage/homepage.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SignUpComponent} from "./Components/sign-up/sign-up.component";
import {HttpClientModule} from "@angular/common/http";
import { MovieCardComponent } from './Components/movie-card/movie-card.component';
import {NgOptimizedImage} from "@angular/common";
import { MovieDetailsComponent } from './Components/movie-details/movie-details.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatPaginatorModule} from "@angular/material/paginator";
import { SearchbarComponent } from './Components/searchbar/searchbar.component';
import { SearchResultsComponent } from './Components/search-results/search-results.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    NavbarComponent,
    MoviesComponent,
    TvshowsComponent,
    HomepageComponent,
    MovieCardComponent,
    MovieDetailsComponent,
    SearchbarComponent,
    SearchResultsComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgOptimizedImage,
        FontAwesomeModule,
        MatPaginatorModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
