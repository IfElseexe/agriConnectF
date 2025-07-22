// src/app/auth/auth.guard.ts
import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authService.isLoggedIn();
  const userRole = authService.getUserRole(); // e.g. farmer, buyer, admin

  if (!isLoggedIn) {
    router.navigate(['/sign-in']);
    return false;
  }

  // Optionally check if route requires a specific role
  const expectedRole = route.data['role'];

  if (expectedRole && userRole !== expectedRole) {
    router.navigate(['/unauthorized']); // or send them back to homepage
    return false;
  }

  return true;
};
