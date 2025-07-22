import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import {
  faBox,
  faShoppingCart,
  faWallet,
  faComments,
  faBell
} from '@fortawesome/free-solid-svg-icons';
import { DashboardDataService } from './dashboard-data';

@Component({
  selector: 'app-farmer-dashboard',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, NgChartsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit {
  // FontAwesome icons
  faBox = faBox;
  faCart = faShoppingCart;
  faWallet = faWallet;
  faComments = faComments;
  faBell = faBell;

  // Dashboard data
  farmerName: string = '';
  productCount: number = 0;
  orderCount: number = 0;
  earnings: number = 0;
  messageCount: number = 0;
  notifications: { message: string }[] = [];

  chartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };

  chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#333',
          font: {
            size: 14
          }
        }
      }
    },
    scales: {
      x: {
        ticks: { color: '#666' },
        grid: { color: '#e0e0e0' }
      },
      y: {
        ticks: { color: '#666' },
        grid: { color: '#e0e0e0' }
      }
    }
  };

  constructor(private dashboardService: DashboardDataService) {}

  ngOnInit(): void {
    this.dashboardService.getFarmerName().subscribe(name => {
      this.farmerName = name;
    });

    this.dashboardService.getDashboardMetrics().subscribe(metrics => {
      this.productCount = metrics.productCount;
      this.orderCount = metrics.orderCount;
      this.earnings = metrics.earnings;
      this.messageCount = metrics.messageCount;
    });

    this.dashboardService.getNotifications().subscribe(data => {
      this.notifications = data;
    });

    this.dashboardService.getChartData().subscribe(data => {
      this.chartData = data;
    });
  }
}
