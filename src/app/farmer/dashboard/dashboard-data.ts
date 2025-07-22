import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardDataService {
  constructor() {}

  getFarmerName(): Observable<string> {
    return of('Emmanuel');
  }

  getDashboardMetrics(): Observable<{
    productCount: number;
    orderCount: number;
    earnings: number;
    messageCount: number;
  }> {
    return of({
      productCount: 12,
      orderCount: 34,
      earnings: 254000,
      messageCount: 5
    });
  }

  getNotifications(): Observable<{ message: string }[]> {
    return of([
      { message: 'New order from Lagos' },
      { message: '3 items out of stock' },
      { message: 'KYC verification approved' },
      { message: 'Withdrawal successful' }
    ]);
  }

  getChartData(): Observable<any> {
    return of({
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          data: [50000, 100000, 75000, 120000, 90000, 150000],
          label: 'Monthly Earnings',
          fill: true,
          borderColor: '#4caf50',
          backgroundColor: 'rgba(76, 175, 80, 0.2)',
          tension: 0.4,
          pointRadius: 5,
          pointBackgroundColor: '#4caf50'
        }
      ]
    });
  }
}
