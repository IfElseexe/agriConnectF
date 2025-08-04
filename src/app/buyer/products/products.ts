import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faMicrophone, faCertificate, faVideo, faVrCardboard, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, HttpClientModule, RouterModule],
  templateUrl: './products.html',
  styleUrls: ['./products.scss']
})
export class Products implements OnInit {
  products: any[] = [];
  selectedProduct: any = null;

  conversations: any[] = []; // holds conversations (used for chatTarget)
  selectedConv: any = null; // currently selected conversation

  constructor(private http: HttpClient, private iconLib: FaIconLibrary, private router: Router) {
    this.iconLib.addIcons(faMicrophone, faCertificate, faVideo, faVrCardboard, faTimes);
  }

  ngOnInit(): void {
    this.loadApprovedProducts();

    const target = localStorage.getItem('chatTarget');
    if (target) {
      const parsed = JSON.parse(target);
      const existing = this.conversations.find(c => c.id === parsed.id);
      if (existing) {
        this.selectedConv = existing;
      } else {
        this.selectedConv = {
          id: parsed.id,
          name: parsed.name,
          avatar: parsed.avatar,
          messages: []
        };
        this.conversations.push(this.selectedConv);
      }
    }
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

  startChat(product: any): void {
    localStorage.setItem('chatTarget', JSON.stringify({
      name: product.farmerName,
      avatar: product.farmerAvatar || 'https://via.placeholder.com/40',
      id: product.farmerId
    }));
    this.router.navigate(['/buyer/messages']);
  }
}
