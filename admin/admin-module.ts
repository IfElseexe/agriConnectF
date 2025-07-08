import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, } from '@angular/router';
import { Routes } from '@angular/router';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { Dashboard } from './dashboard/dashboard';
import { Users } from './users/users';
import { Products } from './products/products';
import { Orders } from './orders/orders';
import { Transactions } from './transactions/transactions';
import { Analytics } from './analytics/analytics';
import { Logistics } from './logistics/logistics';
import { Settings } from './settings/settings';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Disputes } from './disputes/disputes';
import { Messages } from './messages/messages';
import { Security } from './security/security';
import { Announcements } from './announcements/announcements';




export const routes: Routes = [
  {
    path: '',
    component: AdminLayout,
    children: [
      { path: '', component: Dashboard },
      { path: 'users', component: Users },
      { path: 'products', component: Products },
      { path: 'orders', component: Orders },
      { path: 'transactions', component: Transactions },
      { path: 'analytics', component: Analytics },
      { path: 'settings', component: Settings },
      { path: 'disputes', component: Disputes },
      { path: 'messages', component: Messages },
      { path: 'security', component: Security },
      { path: 'announcements', component: Announcements },
      { path: 'logistics', component: Logistics }
    ]
  }
];

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    Dashboard,
    Users,
    Products,
    Orders,
    Transactions,
    Analytics,
    Settings,
    Disputes,
    Messages,
    Security,
    Announcements,
    Logistics,
    MatDialogModule,
    MatPaginatorModule,
    MatButtonModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class AdminModule {}