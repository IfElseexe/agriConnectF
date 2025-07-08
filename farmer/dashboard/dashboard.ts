import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-farmer-dashboard',
  standalone: true,
  imports: [CommonModule, ],
  template: `
    <div class="layout">
      
      <div class="content">
        <h2>Farmer Dashboard</h2>
        <p>Welcome! This is your main dashboard.</p>
      </div>
    </div>
  `,
  styles: [`
    .layout {
      display: flex;
    }
    .content {
      flex: 1;
      padding: 2rem;
    }
  `]
})
export class Dashboard {}