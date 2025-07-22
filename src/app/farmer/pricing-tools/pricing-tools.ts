import { Component } from '@angular/core';
import { faCalculator, faChartLine, faTags, faUserCheck, faStore } from '@fortawesome/free-solid-svg-icons';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-pricing-tools',
  templateUrl: './pricing-tools.html',
  styleUrls: ['./pricing-tools.scss'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule, NgChartsModule]
})
export class PricingTools {
  // Icons
  faCalculator = faCalculator;
  faChartLine = faChartLine;
  faTags = faTags;
  faUserCheck = faUserCheck;
  faStore = faStore;

  // Cost Calculator Fields
  productionCost = 0;
  margin = 0;
  suggestedPrice = 0;

  calculatePrice() {
    this.suggestedPrice = this.productionCost + (this.productionCost * (this.margin / 100));
  }

  // Dummy Competitor Prices
  competitorPrices = [
    { name: 'Market A', price: 250 },
    { name: 'Market B', price: 280 },
    { name: 'Online Store', price: 260 }
  ];

  // Monthly Price Trend Chart
  chartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      data: [240, 250, 260, 255, 270, 280],
      label: 'Avg Price (₦)',
      borderColor: '#2196f3',
      backgroundColor: 'rgba(33, 150, 243, 0.2)',
      fill: true,
      tension: 0.4,
      pointRadius: 5
    }]
  };

  chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false
  };

  // Bulk Discount Tiers
  discountTiers = [
    { quantity: 100, discount: 5 },
    { quantity: 200, discount: 10 },
    { quantity: 500, discount: 15 }
  ];

  // Loyalty Pricing
  loyaltyPrice = 235;

  // Local Market Price Viewer
  localMarkets = [
    { market: 'Zuba Market', price: 260 },
    { market: 'Gwagwalada', price: 255 },
    { market: 'Wuse', price: 275 }
  ];
}
