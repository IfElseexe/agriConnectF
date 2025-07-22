import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  status: string;
  createdAt?: string;
  kycStatus?: 'Pending' | 'Verified' | 'Rejected';
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
  private apiUrl = 'http://localhost:5000/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateUser(id: string, data: Partial<User>): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, data);
  }

  verifyKYC(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/kyc`, { kycStatus: 'Verified' });
  }
}
