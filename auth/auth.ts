import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    // Mock users — replace with real API later
    const users = [
      { email: 'farmer@example.com', password: '1234', role: 'farmer' },
      { email: 'buyer@example.com', password: '1234', role: 'buyer' },
      { email: 'admin@example.com', password: 'admin', role: 'admin' },
    ];

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate([`/${user.role}`]);
      return true;
    }

    return false;
  }

  register(data: any): boolean {
    // Fake success
    console.log('Registered:', data);
    return true;
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/sign-in']);
  }

  getUserRole(): string | null {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.role || null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}