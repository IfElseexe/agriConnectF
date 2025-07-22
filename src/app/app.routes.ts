import { Routes } from '@angular/router';
import { SignIn } from './sign-in/sign-in';
import { SignUp } from './sign-up/sign-up';
import { AuthGuard } from './auth/role-guard'; // ✅ Import Auth Guard

export const routes: Routes = [
  // Redirect to login as default
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },

  // Auth routes
  { path: 'sign-in', component: SignIn },
  { path: 'sign-up', component: SignUp },

  // Farmer dashboard (protected)
  {
    path: 'farmer',
    loadChildren: () =>
      import('./farmer/farmer-module').then(m => m.FarmerModule),
    canActivate: [AuthGuard],
    data: { role: 'farmer' }
  },

  // Buyer dashboard (protected)
  {
    path: 'buyer',
    loadChildren: () =>
      import('./buyer/buyer-module').then(m => m.BuyerModule),
    canActivate: [AuthGuard],
    data: { role: 'buyer' }
  },

  // Admin dashboard (protected)
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin-module').then(m => m.AdminModule),
    canActivate: [AuthGuard],
    data: { role: 'admin' }
  },

  // Optional: Unauthorized route
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./shared/unauthorized/unauthorized').then(
        m => m.UnauthorizedComponent
      )
  },

  // Fallback route
  { path: '**', redirectTo: '/sign-in' }
];
