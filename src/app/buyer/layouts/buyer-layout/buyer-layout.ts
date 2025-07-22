import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BuyerSidebar } from '../../sidebar/sidebar';

@Component({
  selector: 'app-buyer-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, BuyerSidebar],
  template: `
    <div class="layout-container">
      <app-buyer-sidebar></app-buyer-sidebar>
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
export class BuyerLayout {}