import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface User {
  name: string;
  email: string;
  role: 'Farmer' | 'Buyer';
  status: 'Active' | 'Suspended';
  joined: string;
  kycStatus: 'Pending' | 'Verified' | 'Rejected';
  kyc?: {
    idType: string;
    idNumber: string;
    frontImage: string;
    backImage: string;
    verifiedOn?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  constructor() {}

  getUsers(): Observable<User[]> {
    const users: User[] = [
      {
        name: 'Benita Inalegwu',
        email: 'benita@example.com',
        role: 'Buyer',
        status: 'Active',
        joined: '2024-10-15',
        kycStatus: 'Verified',
        kyc: {
          idType: 'National ID',
          idNumber: 'NIN-1123-4567-8901',
          frontImage: 'https://i.imgur.com/1Q9Z1Z1.jpg',
          backImage: 'https://i.imgur.com/AJ3X1R9.jpg',
          verifiedOn: '2024-10-20'
        }
      },
      {
        name: 'Emmanuel Ajibade',
        email: 'ajibadeemmanuel@example.com',
        role: 'Farmer',
        status: 'Suspended',
        joined: '2024-09-01',
        kycStatus: 'Pending'
      },
      {
        name: 'Tolu Mark',
        email: 'tolu.mark@example.com',
        role: 'Buyer',
        status: 'Active',
        joined: '2024-11-12',
        kycStatus: 'Rejected'
      }
    ];

    return of(users); // returns mock data as observable
  }
}