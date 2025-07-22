import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Product } from './product-data';

@Component({
  selector: 'app-product-view-modal',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './product-view-modal.component.html',
  styleUrls: ['./product-view-modal.component.scss']
})
export class ProductViewModalComponent {
  @Input() product!: Product;
  @Output() close = new EventEmitter<void>();
  faTimes = faTimes;
}
