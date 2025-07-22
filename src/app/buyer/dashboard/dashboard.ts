import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgChartsModule } from 'ng2-charts';

import {
  faShoppingBag,
  faTruck,
  faWallet,
  faComments,
  faSearch,
  faList,
  faCreditCard,
  faLifeRing
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-buyer-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, NgChartsModule]

})
export class Dashboard {
  // FontAwesome Icons
  faShoppingBag = faShoppingBag;
  faTruck = faTruck;
  faWallet = faWallet;
  faComments = faComments;
  faSearch = faSearch;
  faList = faList;
  faCreditCard = faCreditCard;
  faLifeRing = faLifeRing;

  // Dummy Data
  totalOrders = 18;
  activeOrders = 4;
  totalSpend = 850000;
  messageCount = 6;

  // Chart Config
  chartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [100000, 120000, 150000, 130000, 160000, 190000],
        label: 'Monthly Spend',
        borderColor: '#3f51b5',
        backgroundColor: 'rgba(63, 81, 181, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#3f51b5'
      }
    ]
  };

  chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#333'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#666'
        },
        grid: {
          color: '#e0e0e0'
        }
      },
      y: {
        ticks: {
          color: '#666'
        },
        grid: {
          color: '#e0e0e0'
        }
      }
    }
  };

  // Navigation Handlers
  goToBrowse() { /* Navigate to product list */ }
  goToOrders() { /* Navigate to orders */ }
  goToTransactions() { /* Navigate to transactions */ }
  goToSupport() { /* Navigate to support or messages */ }
}
