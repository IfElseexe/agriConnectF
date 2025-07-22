import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faMicrophone, faCertificate, faVideo, faVrCardboard, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, HttpClientModule],
  templateUrl: './products.html',
  styleUrls: ['./products.scss']
})
export class Products implements OnInit {
  products: any[] = [];
  selectedProduct: any = null;

  constructor(private http: HttpClient, private iconLib: FaIconLibrary) {
    this.iconLib.addIcons(faMicrophone, faCertificate, faVideo, faVrCardboard, faTimes);
  }

  ngOnInit(): void {
    this.loadApprovedProducts();
  }

  loadApprovedProducts(): void {
    this.http.get<any[]>('http://localhost:5000/api/products/approved').subscribe({
      next: (res) => {
        this.products = res || [];
      },
      error: (err) => {
        console.error('Failed to fetch approved products', err);
        this.products = [];
      }
    });
  }

  openModal(product: any): void {
    this.selectedProduct = product;
  }

  closeModal(): void {
    this.selectedProduct = null;
  }
}
