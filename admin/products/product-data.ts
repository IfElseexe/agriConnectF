import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Product {
  id: string;
  title: string;
  farmerName: string;
  category: string;
  price: number;
  quantity: string;
  image: string;
  status: 'Pending' | 'Approved' | 'Flagged';
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  getProducts(): Observable<Product[]> {
    const products: Product[] = [
      {
        id: 'P001',
        title: 'Fresh Maize',
        farmerName: 'Emmanuel Ajibade',
        category: 'Crops',
        price: 15000,
        quantity: '10 bags',
        image: 'https://images.unsplash.com/photo-1606788075760-7cf342d2df8c',
        status: 'Pending',
        createdAt: '2025-06-15'
      },
      {
        id: 'P002',
        title: 'Healthy Tomatoes',
        farmerName: 'Benita Inalegwu',
        category: 'Vegetables',
        price: 10000,
        quantity: '5 crates',
        image: 'https://images.unsplash.com/photo-1600172454520-d8f9c8cc4bc7',
        status: 'Approved',
        createdAt: '2025-06-20'
      },
      {
        id: 'P003',
        title: 'Basket of Yams',
        farmerName: 'Tolu Mark',
        category: 'Root Crops',
        price: 24000,
        quantity: '4 baskets',
        image: 'https://images.unsplash.com/photo-1598511720587-eec632d62ab2',
        status: 'Flagged',
        createdAt: '2025-06-25'
      }
    ];
    return of(products);
  }
}