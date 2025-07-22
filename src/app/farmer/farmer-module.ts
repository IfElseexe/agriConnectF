import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FarmerLayout } from './layouts/farmer-layout/farmer-layout';
import { Dashboard } from './dashboard/dashboard';
import { Products } from './products/products';
//import { Profile } from './profile/profile';
import { FarmerSidebar } from './sidebar/sidebar';
import { Logistics } from './logistics/logistics';
import { Messages } from './messages/messages';
import { Orders } from './orders/orders';
import { Settings } from './settings/settings';
import { Transactions } from './transactions/transactions';
import { HarvestPlanning } from './harvest-planning/harvest-planning';
import { Inventory } from './inventory/inventory';
import { PricingTools } from './pricing-tools/pricing-tools';
import { QualityControl } from './quality-control/quality-control';
import { Sustainability } from './sustainability/sustainability';

const routes: Routes = [
  {
    path: '',
    component: FarmerLayout,
     children: [
  { path: '', component: Dashboard },
  { path: 'products', component: Products },
  //{ path: 'profile', component: Profile },
  { path: 'logistics', component: Logistics },
  { path: 'messages', component: Messages },
  { path: 'orders', component: Orders },
  { path: 'settings', component: Settings },
  { path: 'transactions', component: Transactions },
  { path: 'harvest-planning', component: HarvestPlanning },
  { path: 'inventory', component: Inventory },
  { path: 'pricing-tools', component: PricingTools },
  { path: 'quality-control', component: QualityControl },
  { path: 'sustainability', component: Sustainability }
     ]
}
];

@NgModule({
 
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    Dashboard,
    Products,
 
    FarmerSidebar,
    Logistics,
    Messages,
    Orders,
    Settings,
    Transactions,
    HarvestPlanning,
    Inventory,
    PricingTools,
    QualityControl,
    Sustainability
  ]
})
export class FarmerModule {}