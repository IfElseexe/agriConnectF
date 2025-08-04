import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  // 🔐 Login and store token + user info
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((res: any) => {
        if (this.isBrowser) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
        }
        this.router.navigate([`/${res.user.role}`]);
      })
    );
  }

  // 👤 Sign up user
  signUp(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  // 🚪 Log out
  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this.router.navigate(['/sign-in']);
  }

  // ✅ Check if user is logged in
  isLoggedIn(): boolean {
    return this.isBrowser && !!localStorage.getItem('token');
  }

  // 🎭 Get user role
  getUserRole(): string | null {
    if (!this.isBrowser) return null;
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.role || null;
  }

  // 🔑 Get auth token
  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem('token') : null;
  }
   getUser(): any {
    if (!this.isBrowser) return null;
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
