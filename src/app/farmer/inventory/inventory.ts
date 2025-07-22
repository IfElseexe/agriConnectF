import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBoxesStacked,
  faList,
  faTh,
  faPlus,
  faEdit,
  faTrash
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.html',
  styleUrls: ['./inventory.scss'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule]
})
export class Inventory {
  // FontAwesome icons
  faBoxesStacked = faBoxesStacked;
  faList = faList;
  faTh = faTh;
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  // UI State
  isCardView = true;
  showAddInventory = false;

  // Dummy Inventory Data
  inventoryList = [
    {
      name: 'Tomatoes',
      quantity: 120,
      batch: 'BCH-1023',
      location: 'Bin A1',
      expiry: '2025-08-01',
      status: 'Good'
    },
    {
      name: 'Cassava',
      quantity: 40,
      batch: 'BCH-1008',
      location: 'Bin B3',
      expiry: '2025-07-15',
      status: 'Low'
    },
    {
      name: 'Yam',
      quantity: 10,
      batch: 'BCH-1011',
      location: 'Bin C2',
      expiry: '2025-07-11',
      status: 'Expiring'
    }
  ];

  // Toggle between views
  toggleView() {
    this.isCardView = !this.isCardView;
  }

  // Toggle add form
  toggleAddInventory() {
    this.showAddInventory = !this.showAddInventory;
  }

  editItem(item: any) {
    console.log('Edit', item);
  }

  deleteItem(item: any) {
    console.log('Delete', item);
  }
}
