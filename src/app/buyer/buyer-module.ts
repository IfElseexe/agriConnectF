import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,  } from '@angular/router';
import { Routes } from '@angular/router';
import { BuyerLayout } from './layouts/buyer-layout/buyer-layout';
import { Dashboard } from './dashboard/dashboard';
import { Products } from './products/products';
import { Cart } from './cart/cart';
import { Orders } from './orders/orders';
import { Messages } from './messages/messages';
import { Settings } from './settings/settings';
import { Profile } from './profile/profile';

export const routes: Routes = [
  {
    path: '',
    component: BuyerLayout,
    children: [
      { path: '', component: Dashboard },
      { path: 'products', component: Products },
      { path: 'cart', component: Cart },
      { path: 'orders', component: Orders },
      { path: 'messages', component: Messages },
      { path: 'settings', component: Settings },
      { path: 'profile', component: Profile }
    ]
  }
];

@NgModule({
 
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    Dashboard,
    Products,
    Profile,
    Cart,
    Messages,
    Orders,
    Settings,
    
  ]
})
export class BuyerModule {}