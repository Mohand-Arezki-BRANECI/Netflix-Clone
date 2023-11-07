import { Component } from '@angular/core';
import {NavbarComponent} from "./Components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title : String  = 'Netflix-Clone';
  showNavbar: boolean = true;

}


