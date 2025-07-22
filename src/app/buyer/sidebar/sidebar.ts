import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faHouse,
  faSearch,
  faShoppingCart,
  faReceipt,
  faComments,
  faCog,
  faUser,
  faRightFromBracket,
  faAngleLeft
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-buyer-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class BuyerSidebar {
  faHouse = faHouse;
  faSearch = faSearch;
  faShoppingCart = faShoppingCart;
  faReceipt = faReceipt;
  faComments = faComments;
  faCog = faCog;
  faUser = faUser;
  faLogout = faRightFromBracket;
  faToggle = faAngleLeft;

  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    localStorage.removeItem('user');
    window.location.href = '/sign-in';
  }
}