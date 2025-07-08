import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AnalyticsDataService {
  getOverviewStats() {
    return of({
      totalUsers: 2400,
      transactions: 9500000,
      products: 560,
      revenue: 4500000,
      buyers: 1100,
      farmers: 1300
    });
  }

  getMonthlyStats() {
    return of({
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      revenue: [120000, 180000, 220000, 260000, 300000, 500000],
      signups: [100, 200, 300, 250, 400, 600]
    });
  }

  getTopProducts() {
    return of([
      { name: 'Maize', count: 150 },
      { name: 'Tomatoes', count: 130 },
      { name: 'Yam', count: 90 }
    ]);
  }
}