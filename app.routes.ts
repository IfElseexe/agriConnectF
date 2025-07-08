import { Routes } from '@angular/router';
import { SignIn } from './sign-in/sign-in';
import { SignUp } from './sign-up/sign-up';
// import { RoleGuard } from './auth/role.guard'; // Optional for future auth control

export const routes: Routes = [
  // Default redirect
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },

  // Auth routes
  { path: 'sign-in', component: SignIn },
  { path: 'sign-up', component: SignUp },

  // Farmer module
  {
    path: 'farmer',
    loadChildren: () =>
      import('./farmer/farmer-module').then(m => m.FarmerModule),
    // canActivate: [RoleGuard],
    // data: { role: 'farmer' }
  },

  // Buyer module
  {
    path: 'buyer',
    loadChildren: () =>
      import('./buyer/buyer-module').then(m => m.BuyerModule),
    // canActivate: [RoleGuard],
    // data: { role: 'buyer' }
  },

  // Admin module
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin-module').then(m => m.AdminModule),
    // canActivate: [RoleGuard],
    // data: { role: 'admin' }
  },

  // Fallback route
  { path: '**', redirectTo: '/sign-in' }
];