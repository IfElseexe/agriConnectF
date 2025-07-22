import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUsers,
  faUserTie,
  faUser,
  faBox,
  faExchangeAlt,
  faShoppingCart
} from '@fortawesome/free-solid-svg-icons';

import { DashboardDataService } from './dashboard-data';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule, FontAwesomeModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit {
  private dashboardService = inject(DashboardDataService);

  
  faUsers = faUsers;
  faUserTie = faUserTie;
  faUser = faUser;
  faBox = faBox;
  faExchangeAlt = faExchangeAlt;
  faShoppingCart = faShoppingCart;

  // Dynamic data
  summaryStats: any = {};
  recentActivities: string[] = [];
  lineChartData!: ChartConfiguration<'line'>['data'];
  topProductsData!: ChartConfiguration<'bar'>['data'];
  selectedRange = 'thisMonth';

  ngOnInit(): void {
    this.dashboardService.getSummaryStats().subscribe(stats => this.summaryStats = stats);
    this.dashboardService.getRecentActivities().subscribe(data => this.recentActivities = data);
    this.dashboardService.getLineChartData().subscribe(data => this.lineChartData = data);
    this.dashboardService.getTopProductsData().subscribe(data => this.topProductsData = data);
  }

  onFilterChange(range: string): void {
    this.selectedRange = range;
    console.log('Filter changed to:', range);
  }
}