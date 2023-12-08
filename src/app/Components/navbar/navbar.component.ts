import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  protected showSearchBar: boolean = true;
  constructor(private router : Router) {
  }
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showSearchBar = !event.url.includes('myspace');
      }
    });
  }





}
