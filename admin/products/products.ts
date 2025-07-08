import { Component, OnInit } from '@angular/core';
import { Product, ProductDataService } from './product-data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBox,
  faUser,
  faCheck,
  faTrash,
  faEye,
  faSearch,
  faFilter,
  faFlag,
  faTags,
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.html',
  styleUrls: ['./products.scss'],
  imports: [CommonModule, FormsModule, FontAwesomeModule]
})
export class Products implements OnInit {
  products: Product[] = [];
  filtered: Product[] = [];
  selectedCategory = 'All';
  selectedStatus = 'All';
  searchQuery = '';

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

  constructor(private productService: ProductDataService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filtered = data;
    });
  }

  filterProducts(): void {
    this.filtered = this.products.filter(p => {
      const cat = this.selectedCategory === 'All' || p.category === this.selectedCategory;
      const status = this.selectedStatus === 'All' || p.status === this.selectedStatus;
      const search = !this.searchQuery ||
        p.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        p.farmerName.toLowerCase().includes(this.searchQuery.toLowerCase());
      return cat && status && search;
    });
  }

  approve(product: Product): void {
    product.status = 'Approved';
  }

  flag(product: Product): void {
    product.status = 'Flagged';
  }

  delete(productId: string): void {
    this.products = this.products.filter(p => p.id !== productId);
    this.filterProducts();
  }

  view(product: Product): void {
    alert(`Viewing ${product.title}`);
  }
}