import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDownload, faUsers, faMoneyBill, faBox, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { AnalyticsDataService } from './analytics-data';

@Component({
  selector: 'app-analytics',
  standalone: true,
  templateUrl: './analytics.html',
  styleUrls: ['./analytics.scss'],
  imports: [CommonModule, NgChartsModule, FontAwesomeModule]
})
export class Analytics implements OnInit {
  faDownload = faDownload;
  faUsers = faUsers;
  faMoneyBill = faMoneyBill;
  faBox = faBox;
  faArrowUp = faArrowUp;

  stats: any = {};
  revenueChartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  signupChartData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };

  constructor(private analyticsService: AnalyticsDataService) {}

  ngOnInit(): void {
    this.analyticsService.getOverviewStats().subscribe(stats => this.stats = stats);

    this.analyticsService.getMonthlyStats().subscribe(data => {
      this.revenueChartData = {
        labels: data.labels,
        datasets: [{
          label: 'Monthly Revenue',
          data: data.revenue,
          borderColor: '#4caf50',
          backgroundColor: 'rgba(76, 175, 80, 0.2)',
          fill: true,
          tension: 0.4
        }]
      };

      this.signupChartData = {
        labels: data.labels,
        datasets: [{
          label: 'User Signups',
          data: data.signups,
          backgroundColor: '#2196f3'
        }]
      };
    });
  }

  exportCSV(): void {
    const csv = `Label,Value
Users,${this.stats.totalUsers}
Buyers,${this.stats.buyers}
Farmers,${this.stats.farmers}
Revenue,${this.stats.revenue}
Products,${this.stats.products}
Transactions,${this.stats.transactions}`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'analytics-overview.csv';
    link.click();
  }
}