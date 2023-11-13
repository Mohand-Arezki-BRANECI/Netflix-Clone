import {Component, OnInit} from '@angular/core';
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  showSearchBar: boolean = true;
  protected readonly faMagnifyingGlass = faMagnifyingGlass;
  protected animationClass : string = ''

  constructor(private router : Router) {
  }
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check the current route and decide whether to show the search bar
        this.showSearchBar = !event.url.includes('myspace');
      }
    });
  }

  addAndRemoveClass() {
      this.animationClass = 'fa-flip';
      setTimeout(() : void => {
        this.animationClass = '';
      }, 1000);

  }


}
