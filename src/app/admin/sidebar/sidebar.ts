import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  faHouse,
  faUsers,
  faBox,
  faShoppingCart,
  faChartLine,
  faMoneyBillTransfer,
  faGear,
  faRightFromBracket,
  faAngleLeft,
  faEnvelope,
  faBalanceScale,
  faShieldHalved,
  faBullhorn,
  faTruck
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class AdminSidebar {
  // Sidebar Icons
  faDashboard = faHouse;
  faUsers = faUsers;
  faProducts = faBox;
  faOrders = faShoppingCart;
  faTransactions = faMoneyBillTransfer;
  faAnalytics = faChartLine;
  faSettings = faGear;
  faLogout = faRightFromBracket;
  faToggle = faAngleLeft;


  // New Icons
  faMessages = faEnvelope;
  faDisputes = faBalanceScale;
  faSecurity = faShieldHalved;
  faAnnouncements = faBullhorn;
  faTruck = faTruck;

  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    localStorage.removeItem('user');
    window.location.href = '/sign-in';
  }
}