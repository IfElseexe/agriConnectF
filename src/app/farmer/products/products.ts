import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faPlus, faPen, faTrash, faBox, faSeedling, faWarehouse, faExclamationTriangle, faTh, faList } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddProductFormComponent } from './add-product-form/add-product-form';
import { AuthService } from '../../auth/auth'; // adjust path as needed

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, AddProductFormComponent],
  templateUrl: './products.html',
  styleUrls: ['./products.scss'],
})
export class Products implements OnInit {
  // Icons
  faPlus = faPlus;
  faPen = faPen;
  faTrash = faTrash;
  faBox = faBox;
  faSeedling = faSeedling;
  faWarehouse = faWarehouse;
  faExclamationTriangle = faExclamationTriangle;
  faTh = faTh;
  faList = faList;

  // UI control
  showCardView = true;
  showForm = false;
  editMode = false;
  selectedProduct: any = null;

  // Data
  products: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.http.get<any[]>('/api/products').subscribe((res) => {
      this.products = res.filter(p => !p.isDeleted);
    });
    
  }

  toggleView(view: 'card' | 'list') {
    this.showCardView = view === 'card';
  }

  toggleForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.editMode = false;
    this.selectedProduct = null;
    this.fetchProducts();
  }

  editProduct(product: any) {
    this.editMode = true;
    this.selectedProduct = product;
    this.showForm = true;
  }

 deleteProduct(productId: string) {
  if (confirm('Are you sure you want to delete this product?')) {
    const headers = {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    };

    this.http.delete(`/api/products/${productId}`, headers).subscribe(() => {
      this.products = this.products.filter(p => p._id !== productId);
      alert('Product deleted!');
    }, (error) => {
      console.error('Delete failed:', error);
      alert('Failed to delete product.');
    });
  }
}



  get totalProducts() {
    return this.products.length;
  }

  get readyForHarvest() {
    const today = new Date();
    return this.products.filter(p => new Date(p.harvestStart) <= today && new Date(p.harvestEnd) >= today).length;
  }

  get inStorage() {
    return this.products.filter(p => p.storage).length;
  }

  get expiringSoon() {
    const in7days = new Date();
    in7days.setDate(in7days.getDate() + 7);
    return this.products.filter(p => new Date(p.harvestEnd) <= in7days).length;
  }

  
}
