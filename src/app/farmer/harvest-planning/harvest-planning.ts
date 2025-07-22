import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCalendarDays,
  faUserGroup,
  faTractor,
  faChartLine,
  faBell
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-harvest-planning',
  templateUrl: './harvest-planning.html',
  styleUrls: ['./harvest-planning.scss'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule]
})
export class HarvestPlanning {
  // FontAwesome Icons
  faCalendar = faCalendarDays;
  faTeam = faUserGroup;
  faTractor = faTractor;
  faChart = faChartLine;
  faBell = faBell;

  // Calendar mock data
  schedule = [
    { date: '2025-07-12', type: 'Planting', crop: 'Maize' },
    { date: '2025-08-20', type: 'Harvesting', crop: 'Tomatoes' }
  ];

  // Team assignments
  team = [
    { name: 'Bello', task: 'Weeding', date: '2025-07-15' },
    { name: 'Grace', task: 'Harvest Tomatoes', date: '2025-08-20' }
  ];

  // Equipment usage
  equipment = [
    { name: 'Tractor A', purpose: 'Land Prep', scheduled: '2025-07-10' },
    { name: 'Sprayer', purpose: 'Pest Control', scheduled: '2025-07-18' }
  ];

  // Simulated Yield prediction
  predictedYield = '2.3 tons / acre (Tomatoes)';

  // Reminders
  reminders = [
    { task: 'Fertilize maize field', date: '2025-07-14' },
    { task: 'Irrigation check', date: '2025-07-16' },
    { task: 'Pest monitoring', date: '2025-07-18' }
  ];
}
