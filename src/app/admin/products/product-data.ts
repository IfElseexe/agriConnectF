import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  _id: string;
  name: string;
  farmerName: string;
  category: string;
  quantity: number;
  unit: string;
  price?: number;
  variety?: string;
  certifications?: string;
  storage?: string;
  harvestStart?: string;
  harvestEnd?: string;
  imageUrl?: string;
  status: 'Pending' | 'Approved' | 'Flagged';
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  private baseUrl = '/api/products';
  private optionsUrl = '/api/options';

  constructor(private http: HttpClient) {}

  // 🔹 Product CRUD
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  approveProduct(id: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}/approve`, {});
  }

  flagProduct(id: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}/flag`, {});
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // 🔹 Option Fetchers
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.optionsUrl}/categories`);
  }

  getUnits(): Observable<string[]> {
    return this.http.get<string[]>(`${this.optionsUrl}/units`);
  }

  getCertifications(): Observable<string[]> {
    return this.http.get<string[]>(`${this.optionsUrl}/certifications`);
  }

  getStorageOptions(): Observable<string[]> {
    return this.http.get<string[]>(`${this.optionsUrl}/storage`);
  }
}
