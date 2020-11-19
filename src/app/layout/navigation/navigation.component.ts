import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { User } from '@data/schema/user';

import { AuthService } from '@core/service/auth.service';

import {
  faChevronDown,
  faChartLine
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: [
    './navigation.component.scss', 
    '../../app.component.scss'
  ]
})
export class NavigationComponent implements OnInit {  
  currentUser: User;
  user: User;
  data: any;
  showSearchResults: boolean = false;
  searchValue: any;
  searchInput: string;
  searchResults: any;

  showProfileMenu: boolean = false;

  faChevronDown = faChevronDown
  faChartLine = faChartLine;

  navItems: any;

  private sub: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router
  ) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.navItems = [
      { "link": "dashboard", "title": "Dashboard", "icon": faChartLine }
    ]
  }

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  handleLogout(){
    this.authService.logout();
    this.router.navigate(['/login'])
  }

  ngOnInit() {}

  updateSearch(value) {
    this.showSearchResults = true;
    this.searchValue = value;
  }

  closeSearchResults(event) {
    this.showSearchResults = false;
    this.searchInput = '';
  }
}
