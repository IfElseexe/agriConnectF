import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import {
  faTruckLoading,
  faCheckCircle,
  faClock,
  faTimesCircle,
  faSearch,
  faEye
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.html',
  styleUrls: ['./orders.scss'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule]
})
export class Orders {
  // FontAwesome Icons
  faPending = faClock;
  faCompleted = faCheckCircle;
  faCancelled = faTimesCircle;
  faSearch = faSearch;
  faView = faEye;
  faShipped = faTruckLoading;

  // Summary
  orders = [
    {
      id: 'ORD-101',
      product: 'Tomatoes',
      buyer: 'Ben Okafor',
      quantity: 10,
      price: 5000,
      date: '2025-07-09',
      status: 'Pending'
    },
    {
      id: 'ORD-102',
      product: 'Maize',
      buyer: 'Adaeze Farms',
      quantity: 20,
      price: 12000,
      date: '2025-07-08',
      status: 'Completed'
    },
    {
      id: 'ORD-103',
      product: 'Carrots',
      buyer: 'AgroLink',
      quantity: 15,
      price: 7500,
      date: '2025-07-07',
      status: 'Cancelled'
    }
  ];

  statusFilter = '';
  searchTerm = '';
  selectedOrder: any = null;

  // Summary Counts
  get totalOrders() {
    return this.orders.length;
  }
  get pendingOrders() {
    return this.orders.filter(o => o.status === 'Pending').length;
  }
  get completedOrders() {
    return this.orders.filter(o => o.status === 'Completed').length;
  }
  get cancelledOrders() {
    return this.orders.filter(o => o.status === 'Cancelled').length;
  }

  // Filtered List
  get filteredOrders() {
    return this.orders.filter(order => {
      const matchesSearch = order.product.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                            order.buyer.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                            order.id.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.statusFilter === '' || order.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }

  openOrder(order: any) {
    this.selectedOrder = { ...order };
  }

  closeModal() {
    this.selectedOrder = null;
  }

  updateStatus(status: string) {
    this.selectedOrder.status = status;
    const index = this.orders.findIndex(o => o.id === this.selectedOrder.id);
    if (index !== -1) this.orders[index].status = status;
    this.closeModal();
  }
}
