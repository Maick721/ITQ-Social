import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  email: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly router = inject(Router);
  
  readonly currentUser = signal<User | null>(null);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  // Login con Microsoft
  loginWithMicrosoft(): void {
    this.isLoading.set(true);
    const clientId = '81feaced-5ddd-41e7-8bef-3e20a2689bb7';
    const redirectUri = encodeURIComponent('https://account.microsoft.com/auth/complete-signin-oauth');
    const scope = encodeURIComponent('service::account.microsoft.com::MBI_SSL openid profile offline_access');
    
    const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?scope=${scope}&response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&prompt=login`;
    window.location.href = authUrl;
  }

  // Login tradicional
  loginWithEmail(email: string, password: string): void {
    this.isLoading.set(true);
    this.error.set(null);

    setTimeout(() => {
      if (email === 'admin@itq.com' && password === '123456') {
        this.currentUser.set({ email, name: email.split('@')[0] });
        this.router.navigate(['/home']);
      } else {
        this.error.set('Email: admin@itq.com | Password: 123456');
      }
      this.isLoading.set(false);
    }, 1000);
  }

  logout(): void {
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }
}