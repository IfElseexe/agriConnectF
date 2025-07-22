import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import {
  faLeaf,
  faRecycle,
  faHandHoldingHeart,
  faTint,
  faBolt
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sustainability',
  templateUrl: './sustainability.html',
  styleUrls: ['./sustainability.scss'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule]
})
export class Sustainability {
  faLeaf = faLeaf;
  faRecycle = faRecycle;
  faDonate = faHandHoldingHeart;
  faWater = faTint;
  faEnergy = faBolt;

  carbonInputs = {
    waterUsed: 12000, // in liters
    energyUsed: 430, // in kWh
    diesel: 50 // in liters
  };

  get estimatedEmissions(): number {
    return (
      this.carbonInputs.waterUsed * 0.002 +
      this.carbonInputs.energyUsed * 0.7 +
      this.carbonInputs.diesel * 2.6
    );
  }

  wasteLogs = [
    { type: 'Spoiled Tomatoes', method: 'Composted', date: '2025-07-01' },
    { type: 'Leftover Stalks', method: 'Repurposed', date: '2025-07-06' }
  ];

  donations = [
    { item: '2 crates of tomatoes', recipient: 'Local food bank', date: '2025-07-02' },
    { item: '5kg of maize', recipient: 'Charity outreach', date: '2025-07-05' }
  ];
}
