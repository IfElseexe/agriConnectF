import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTrash, faPlus, faMinus, faTimes, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss']
})
export class Cart {
  cartItems = [
    {
      id: 1,
      name: 'Fresh Tomatoes',
      image: 'https://via.placeholder.com/100',
      price: 1500,
      quantity: 2
    },
    {
      id: 2,
      name: 'Organic Yams',
      image: 'https://via.placeholder.com/100/00ff99',
      price: 3000,
      quantity: 1
    }
  ];

  showCheckout = false;

  constructor(private iconLib: FaIconLibrary) {
    this.iconLib.addIcons(faTrash, faPlus, faMinus, faTimes, faArrowRight);
  }

  increaseQuantity(item: any) {
    item.quantity += 1;
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) item.quantity -= 1;
  }

  removeItem(id: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
  }

  get subtotal() {
    return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  openCheckout() {
    this.showCheckout = true;
  }

  closeCheckout() {
    this.showCheckout = false;
  }

  completeCheckout() {
    alert('Checkout completed!');
    this.cartItems = [];
    this.closeCheckout();
  }
}
