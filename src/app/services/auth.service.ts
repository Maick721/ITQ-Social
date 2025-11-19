import { Injectable, signal, computed } from '@angular/core';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: 'user' | 'admin';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioActual = signal<Usuario | null>(null);
  
  readonly estaAutenticado = computed(() => !!this.usuarioActual());
  readonly esAdministrador = computed(() => this.usuarioActual()?.rol === 'admin');
  readonly usuario = this.usuarioActual.asReadonly();

  login(email: string, password: string): boolean {
    // Lógica temporal
    if (email === 'admin@itq.com' && password === 'admin123') {
      this.usuarioActual.set({ 
        id: 1, 
        nombre: 'Administrador', 
        email: email, 
        rol: 'admin' 
      });
      return true;
    } else if (email && password.length >= 6) {
      this.usuarioActual.set({ 
        id: 2, 
        nombre: 'Usuario Demo', 
        email: email, 
        rol: 'user' 
      });
      return true;
    }
    return false;
  }

  logout(): void {
    this.usuarioActual.set(null);
  }
}