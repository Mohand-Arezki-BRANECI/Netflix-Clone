import { Component } from '@angular/core';
import {faHome, faList, faMagnifyingGlass, faSitemap} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  protected readonly faMagnifyingGlass = faMagnifyingGlass;
  protected animationClass = ''

  addAndRemoveClass() {
      this.animationClass = 'fa-flip';
      setTimeout(() => {
        this.animationClass = '';
      }, 1000);
  }


}
