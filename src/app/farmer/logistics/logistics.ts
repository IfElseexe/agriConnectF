import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import {
  faTruck,
  faRoute,
  faUserTie,
  faWrench,
  faMapMarkedAlt,
  faPlus
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-logistics',
  templateUrl: './logistics.html',
  styleUrls: ['./logistics.scss']
  ,standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule]
})
export class Logistics{
  // Icons
  faTruck = faTruck;
  faRoute = faRoute;
  faUserTie = faUserTie;
  faWrench = faWrench;
  faMap = faMapMarkedAlt;
  faPlus = faPlus;

  activeDeliveries = 6;
  availableDrivers = 3;
  scheduledPickups = 4;
  vehiclesInUse = 5;

  drivers = [
    { name: 'James Ade', phone: '08012345678', status: 'Available', lastDelivery: 'Today 9:45 AM' },
    { name: 'Blessing John', phone: '08098765432', status: 'On Delivery', lastDelivery: 'Today 8:15 AM' },
    { name: 'Victor Musa', phone: '08133445566', status: 'Available', lastDelivery: 'Yesterday 4:30 PM' }
  ];

  vehicles = [
    { type: 'Van', capacity: '2 Tons', plate: 'ABC-123-KD', status: 'In Use', driver: 'Blessing John', maintenance: false },
    { type: 'Truck', capacity: '5 Tons', plate: 'XYZ-987-FC', status: 'Available', driver: 'Victor Musa', maintenance: true },
    { type: 'Bike', capacity: '200kg', plate: 'BKE-456-AB', status: 'In Use', driver: 'James Ade', maintenance: false }
  ];
}
