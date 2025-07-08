import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Order {
  id: string;
  buyerName: string;
  farmerName: string;
  product: string;
  quantity: number;
  price: number;
  status: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered';
  createdAt: string;
  proofUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class OrderDataService {
  getOrders(): Observable<Order[]> {
    return of([
      {
        id: 'ORD-001',
        buyerName: 'Benita Inalegwu',
        farmerName: 'Emmanuel Ajibade',
        product: 'Yam Tubers',
        quantity: 10,
        price: 3500,
        status: 'Pending',
        createdAt: '2025-07-08',
        proofUrl: ''
      },
      {
        id: 'ORD-002',
        buyerName: 'John Obi',
        farmerName: 'Blessing Akpan',
        product: 'Fresh Maize',
        quantity: 25,
        price: 8500,
        status: 'Shipped',
        createdAt: '2025-07-07',
        proofUrl: 'https://source.unsplash.com/160x90/?delivery'
      }
    ]);
  }
}