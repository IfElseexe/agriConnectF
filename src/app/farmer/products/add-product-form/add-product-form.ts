import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product-form.html',
  styleUrls: ['./add-product-form.scss']
})
export class AddProductFormComponent implements OnInit {
  @Input() productData: any = null;
  @Input() isEdit: boolean = false;
  @Output() close = new EventEmitter<void>();

  product: any = {
    name: '',
    category: '',
    variety: '',
    harvestStart: '',
    harvestEnd: '',
    quantity: null,
    unit: '',
    storage: '',
    certifications: [],
    description: '',
    price: null,
    location: ''
  };

  productImage: File | null = null;
  imagePreviewUrl: string | null = null;

  categories: string[] = [];
  units: string[] = [];
  certifications: string[] = [];

  states: string[] = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
    'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',
    'FCT - Abuja', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina',
    'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo',
    'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProductOptions();

    if (this.isEdit && this.productData) {
      this.product = { ...this.productData };

      // If image already exists, use it as preview
      if (this.product.images && this.product.images.length > 0) {
        this.imagePreviewUrl = this.product.images[0];
      }
    }
  }

  fetchProductOptions() {
    this.http.get<any>('/api/product-options').subscribe({
      next: (res) => {
        this.categories = res.categories || [];
        this.units = res.units || [];
        this.certifications = res.certifications || [];
      },
      error: (err) => {
        console.error('Failed to fetch product options:', err);
      }
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.productImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  saveProduct() {
    if (!this.product.name?.trim()) {
      alert('Product name is required.');
      return;
    }

    const formData = new FormData();

    formData.append('name', this.product.name.trim());
    formData.append('category', this.product.category || '');
    formData.append('variety', this.product.variety || '');
    formData.append('harvestStart', this.product.harvestStart || '');
    formData.append('harvestEnd', this.product.harvestEnd || '');
    formData.append('quantity', this.product.quantity?.toString() || '');
    formData.append('unit', this.product.unit || '');
    formData.append('storage', this.product.storage || '');
    formData.append('description', this.product.description || '');
    formData.append('price', this.product.price?.toString() || '');
    formData.append('location', this.product.location || '');

    if (Array.isArray(this.product.certifications)) {
      formData.append('certifications', JSON.stringify(this.product.certifications));
    }

    if (this.productImage) {
      formData.append('image', this.productImage);
    }

    const farmerId = localStorage.getItem('userId') || '664b0b3b6c5ae12e18c55fc9';
    formData.append('farmerId', farmerId);

    const endpoint = this.isEdit
      ? `/api/products/${this.product._id}`
      : '/api/products';

    const request = this.isEdit
      ? this.http.put(endpoint, formData)
      : this.http.post(endpoint, formData);

    request.subscribe({
      next: () => {
        alert(this.isEdit ? 'Product updated successfully!' : 'Product saved!');
        this.close.emit();
      },
      error: (err) => {
        console.error(err);
        alert('An error occurred while saving the product.');
      }
    });
  }
}
