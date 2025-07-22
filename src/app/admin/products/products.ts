import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBox, faUser, faCheck, faTrash, faEye, faSearch,
  faFilter, faFlag, faTags, faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Product, ProductDataService } from './product-data';
import { ProductViewModalComponent } from './product-view-modal.component';
import { AuthService } from '../../auth/auth'; // adjust path as needed
@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.html',
  styleUrls: ['./products.scss'],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    ProductViewModalComponent
  ]
})
export class Products implements OnInit {
  products: Product[] = [];
  filtered: Product[] = [];
  selectedCategory = 'All';
  selectedStatus = 'All';
  searchQuery = '';
  categories: string[] = [];

  viewingProduct: Product | null = null;

  // Icons
  faBox = faBox;
  faCheck = faCheck;
  faTrash = faTrash;
  faEye = faEye;
  faSearch = faSearch;
  faFilter = faFilter;
  faFlag = faFlag;
  faTags = faTags;
  faCalendarAlt = faCalendarAlt;
  faUser = faUser;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchCategories();
  }

  fetchProducts(): void {
    this.http.get<Product[]>('/api/products')
      .pipe(catchError(() => of([])))
      .subscribe(data => {
        this.products = data;
        this.filtered = [...data];
      });
  }

  fetchCategories(): void {
    this.http.get<string[]>('/api/product-options/categories')
      .pipe(catchError(() => of([])))
      .subscribe(data => {
        this.categories = data;
      });
  }

  filterProducts(): void {
    this.filtered = this.products.filter(p => {
      const catMatch = this.selectedCategory === 'All' || p.category === this.selectedCategory;
      const statusMatch = this.selectedStatus === 'All' || p.status === this.selectedStatus;
      const queryMatch =
        !this.searchQuery ||
        p.name?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        p.farmerName?.toLowerCase().includes(this.searchQuery.toLowerCase());

      return catMatch && statusMatch && queryMatch;
    });
  }

approve(product: Product): void {
  const headers = {
    headers: {
      Authorization: `Bearer ${this.authService.getToken()}`
    }
  };

  this.http.patch(`/api/products/${product._id}/approve`, {}, headers)
    .subscribe(() => {
      product.status = 'Approved'; // Make sure status matches backend: capitalized 'Approved'
      this.filterProducts();
    }, (error) => {
      console.error('Approval failed:', error);
      alert('You are not authorized or token is invalid.');
    });
}


  flag(product: Product): void {
    this.http.patch(`/api/products/${product._id}/flag`, {})
      .subscribe(() => {
        product.status = 'Flagged';
        this.filterProducts();
      });
  }

  delete(productId: string): void {
    this.http.delete(`/api/products/${productId}`)
      .subscribe(() => {
        this.products = this.products.filter(p => p._id !== productId);
        this.filterProducts();
      });
  }

  view(product: Product): void {
    this.viewingProduct = product;
  }

  closeModal(): void {
    this.viewingProduct = null;
  }
}
