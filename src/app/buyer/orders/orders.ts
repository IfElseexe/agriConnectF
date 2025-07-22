import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faTruck,
  faTimes,
  faCheck,
  faClock,
  faPhone
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './orders.html',
  styleUrls: ['./orders.scss']
})
export class Orders {
  orders = [
    {
      id: 1,
      productName: 'Fresh Tomatoes',
      image: 'https://via.placeholder.com/100',
      quantity: 3,
      price: 4500,
      status: 'Pending',
      tracking: 'Awaiting dispatch',
      date: '2025-07-09'
    },
    {
      id: 2,
      productName: 'Organic Yams',
      image: 'https://via.placeholder.com/100/00ff99',
      quantity: 2,
      price: 6000,
      status: 'Shipped',
      tracking: 'In transit to Abuja',
      date: '2025-07-07'
    },
    {
      id: 3,
      productName: 'Palm Oil',
      image: 'https://via.placeholder.com/100/ffcc00',
      quantity: 1,
      price: 3000,
      status: 'Delivered',
      tracking: 'Delivered on 2025-07-03',
      date: '2025-07-03'
    }
  ];

  constructor(private lib: FaIconLibrary) {
    lib.addIcons(faTruck, faTimes, faCheck, faClock, faPhone);
  }

  // Returns the appropriate icon based on order status
  getStatusIcon(status: string): IconDefinition {
    switch (status) {
      case 'Pending': return faClock;
      case 'Shipped': return faTruck;
      case 'Delivered': return faCheck;
      case 'Cancelled': return faTimes;
      default: return faClock;
    }
  }

  cancelOrder(id: number): void {
    const order = this.orders.find(o => o.id === id);
    if (order && order.status === 'Pending') {
      order.status = 'Cancelled';
      order.tracking = 'Order cancelled by user';
    }
  }

  contactSupport(order: any): void {
    alert(`Contacting support for Order #${order.id}`);
  }
}
