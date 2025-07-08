import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faHouse,
  faBoxOpen,
  faReceipt,
  faCreditCard,
  faComments,
  faTruck,
  faCog,
  faUser,
  faRightFromBracket,
  faAngleLeft
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-farmer-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class FarmerSidebar {
  // Icons
  faHouse = faHouse;
  faBoxOpen = faBoxOpen;
  faReceipt = faReceipt;
  faCreditCard = faCreditCard;
  faComments = faComments;
  faTruck = faTruck;
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