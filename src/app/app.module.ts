import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './Components/Authentification/sign-in/sign-in.component';
import { SignUpComponent } from './Components/Authentification/sign-up/sign-up.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { MoviesComponent } from './Components/Pages/movies/movies.component';
import { TvshowsComponent } from './Components/Pages/tvshows/tvshows.component';
import { HomepageComponent } from './Components/Pages/homepage/homepage.component';
import { MyspaceComponent } from './Components/Pages/myspace/myspace.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    NavbarComponent,
    MoviesComponent,
    TvshowsComponent,
    HomepageComponent,
    MyspaceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
