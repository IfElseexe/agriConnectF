import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Transaction {
  id: string;
  user: string;
  role: 'Buyer' | 'Farmer';
  amount: number;
  date: string;
  method: 'Card' | 'Bank Transfer' | 'Mobile Money';
  status: 'Success' | 'Pending' | 'Failed';
  orderId: string;
}

@Injectable({ providedIn: 'root' })
export class TransactionDataService {
  getTransactions(): Observable<Transaction[]> {
    return of([
      {
        id: 'TXN-001',
        user: 'Benita Inalegwu',
        role: 'Buyer',
        amount: 45000,
        date: '2025-07-07',
        method: 'Card',
        status: 'Success',
        orderId: 'ORD-001'
      },
      {
        id: 'TXN-002',
        user: 'Emmanuel Ajibade',
        role: 'Farmer',
        amount: 250000,
        date: '2025-07-05',
        method: 'Bank Transfer',
        status: 'Pending',
        orderId: 'ORD-003'
      }
    ]);
  }
}