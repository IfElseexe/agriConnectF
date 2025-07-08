import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faTruck,
  faUserTie,
  faCar,
  faPlus,
  faEye,
  faBan,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-logistics',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './logistics.html',
  styleUrls: ['./logistics.scss']
})
export class Logistics implements OnInit {
  faTruck = faTruck;
  faUserTie = faUserTie;
  faCar = faCar;
  faPlus = faPlus;
  faEye = faEye;
  faBan = faBan;
  faCheckCircle = faCheckCircle;

  drivers = [
    {
      name: 'Ahmed Yusuf',
      license: 'DL-109-AF',
      status: 'active',
      rating: 4.7,
      assignedVehicle: 'Truck A',
      trips: 23
    },
    {
      name: 'Benita Inalegwu',
      license: 'DL-505-KD',
      status: 'suspended',
      rating: 4.3,
      assignedVehicle: 'Van C',
      trips: 15
    }
  ];

  vehicles = [
    {
      plate: 'AG-456-ABJ',
      type: 'Mini Truck',
      status: 'available',
      assignedDriver: 'Ahmed Yusuf',
      usageCount: 40
    },
    {
      plate: 'BW-120-KD',
      type: 'Van',
      status: 'in-use',
      assignedDriver: 'Benita Inalegwu',
      usageCount: 28
    }
  ];

  ngOnInit(): void {}

  toggleDriverStatus(driver: any) {
    driver.status = driver.status === 'active' ? 'suspended' : 'active';
  }
}