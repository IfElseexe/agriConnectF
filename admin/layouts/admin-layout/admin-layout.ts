import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminSidebar } from '../../sidebar/sidebar';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AdminSidebar],
  template: `
    <div class="layout-container">
      <app-admin-sidebar></app-admin-sidebar>
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
export class AdminLayout {}