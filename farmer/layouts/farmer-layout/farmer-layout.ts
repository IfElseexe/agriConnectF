import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FarmerSidebar } from '../../sidebar/sidebar';

@Component({
  selector: 'app-farmer-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FarmerSidebar],
  template: `
    <div class="layout-container">
      <app-farmer-sidebar></app-farmer-sidebar>
      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .layout-container {
      display: flex;
    }
    .content {
      flex: 1;
      padding: 1rem;
    }
  `]
})
export class FarmerLayout {}