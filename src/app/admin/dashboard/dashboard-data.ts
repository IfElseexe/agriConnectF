import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ChartConfiguration } from 'chart.js';

@Injectable({ providedIn: 'root' })
export class DashboardDataService {
  getSummaryStats(): Observable<any> {
    return of({
      totalUsers: 2400,
      farmers: 1300,
      buyers: 1100,
      products: 420,
      transactions: 8500000,
      orders: 1200
    });
  }

  getRecentActivities(): Observable<string[]> {
    return of([
      'Benita Inalegwu signed up as Buyer (2 mins ago)',
      'Farm produce added by Emmanuel Ajibade (5 mins ago)',
      '₦45,000 order placed by Buyer #209',
      'New product listing: 10 bags of maize (20 mins ago)',
      'Payment of ₦250,000 released to Farmer #102'
    ]);
  }

  getLineChartData(): Observable<ChartConfiguration<'line'>['data']> {
    return of({
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          data: [120000, 190000, 300000, 500000, 250000, 600000],
          label: 'Monthly Transactions',
          fill: true,
          tension: 0.4,
          borderColor: '#36a2eb',
          backgroundColor: 'rgba(54,162,235,0.2)'
        }
      ]
    });
  }

  getTopProductsData(): Observable<ChartConfiguration<'bar'>['data']> {
    return of({
      labels: ['Maize', 'Rice', 'Tomatoes', 'Yam', 'Pepper'],
      datasets: [
        {
          data: [150, 120, 100, 80, 60],
          label: 'Top 5 Products (Qty)',
          backgroundColor: '#4caf50'
        }
      ]
    });
  }
}