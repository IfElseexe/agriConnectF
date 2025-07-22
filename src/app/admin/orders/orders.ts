import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faTruck, faUser, faSearch, faEye, faClipboardCheck,
  faCheckCircle, faShippingFast, faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import { Order, OrderDataService } from './orders-data';

@Component({
  selector: 'app-orders',
  standalone: true,
  templateUrl: './orders.html',
  styleUrls: ['./orders.scss'],
  imports: [CommonModule, FormsModule, FontAwesomeModule]
})
export class Orders implements OnInit {
  orders: Order[] = [];
  filtered: Order[] = [];
  searchQuery = '';

  // Icons
  faTruck = faTruck;
  faUser = faUser;
  faSearch = faSearch;
  faEye = faEye;
  faCheckCircle = faCheckCircle;
  faShippingFast = faShippingFast;
  faClipboardCheck = faClipboardCheck;
  faTimesCircle = faTimesCircle;

  constructor(private orderService: OrderDataService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
      this.filtered = data;
    });
  }

  search(): void {
    const q = this.searchQuery.toLowerCase();
    this.filtered = this.orders.filter(order =>
      order.buyerName.toLowerCase().includes(q) ||
      order.farmerName.toLowerCase().includes(q) ||
      order.product.toLowerCase().includes(q)
    );
  }

  updateStatus(order: Order, newStatus: Order['status']): void {
    order.status = newStatus;
  }

  viewProof(order: Order): void {
    if (order.proofUrl) {
      window.open(order.proofUrl, '_blank');
    } else {
      alert('No proof uploaded yet.');
    }
  }
}