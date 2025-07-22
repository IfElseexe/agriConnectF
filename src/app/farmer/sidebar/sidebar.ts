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
  faAngleLeft,
  faBoxesStacked,
  faDollarSign,
  faSeedling,
  faClipboardCheck,
  faLeaf,
  faCalendarCheck,
  faAngleDown
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-farmer-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class FarmerSidebar {
  // Main links icons
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

  // Farm Management icons
  faBoxesStacked = faBoxesStacked;
  faDollarSign = faDollarSign;
  faSeedling = faSeedling;
  faClipboardCheck = faClipboardCheck;
  faLeaf = faLeaf;
  faCalendarCheck = faCalendarCheck;
  faAngleDown = faAngleDown;

  // State
  isCollapsed = false;
  isFarmDropdownOpen = false;

  // Methods
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleFarmManagementDropdown() {
    this.isFarmDropdownOpen = !this.isFarmDropdownOpen;
  }

  logout() {
    localStorage.removeItem('user');
    window.location.href = '/sign-in';
  }
}
