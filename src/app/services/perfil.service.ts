import { Injectable } from '@angular/core';

export interface PerfilUsuario {
  nombre: string;
  carrera: string;
  semestre: number;
  bio: string;
  fotoUrl: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private perfilKey = 'perfilUsuario'; // almacenamiento local

  constructor() {}

  // ✔ Guardar perfil
  guardarPerfil(data: PerfilUsuario) {
    localStorage.setItem(this.perfilKey, JSON.stringify(data));
  }

  // ✔ Obtener perfil
  getPerfil(): PerfilUsuario | null {
    const data = localStorage.getItem(this.perfilKey);
    return data ? JSON.parse(data) : null;
  }

  // ✔ Borrar perfil (opcional)
  borrarPerfil() {
    localStorage.removeItem(this.perfilKey);
  }
}
