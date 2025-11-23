import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface User {
  id: number;
  nombre: string;
  email: string;
  perfilCompleto: boolean;
}

export interface LoginResponse {
  token: string;
  usuario: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    // Simular usuario - inicialmente perfil INCOMPLETO
    const mockUser: User = {
      id: 1,
      nombre: credentials.email.split('@')[0],
      email: credentials.email,
      perfilCompleto: false 
    };

    return of({
      token: 'mock-token',
      usuario: mockUser
    }).pipe(
      delay(800),
      tap((response: LoginResponse) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.usuario));
        this.currentUserSubject.next(response.usuario);
      })
    );
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Método para marcar perfil como completo
  completarPerfil(datosPerfil: Partial<User>) {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      const usuarioActualizado: User = {
        ...currentUser,
        ...datosPerfil,
        perfilCompleto: true 
      };
      
      localStorage.setItem('user', JSON.stringify(usuarioActualizado));
      this.currentUserSubject.next(usuarioActualizado);
    }
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  isProfileComplete(): boolean {
    const user = this.getCurrentUser();
    return user ? user.perfilCompleto : false;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  register(userData: any): Observable<{ success: boolean }> {
    return of({ success: true }).pipe(delay(800));
  }
}
