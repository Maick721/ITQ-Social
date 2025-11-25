import { Injectable } from '@angular/core';

export interface PerfilUsuario {
  nombre: string;
  carrera: string;
  semestre: number;
  bio: string;
  fotoUrl: string | null;
  publicaciones?: number;
  amigos?: number;
}

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private perfilKey = 'perfilUsuario'; 

  constructor() {}

  guardarPerfil(data: PerfilUsuario) {
    localStorage.setItem(this.perfilKey, JSON.stringify(data));
  }

  getPerfil(): PerfilUsuario | null {
    const data = localStorage.getItem(this.perfilKey);
    return data ? JSON.parse(data) : null;
  }

  borrarPerfil() {
    localStorage.removeItem(this.perfilKey);
  }
}