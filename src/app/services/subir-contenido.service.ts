import { Injectable } from '@angular/core';

export interface Publicacion {
  id: number;
  usuarioNombre: string;
  usuarioAvatar: string;
  comentario: string;
  imagenUrl: string;
  tiempo: string;
  likes: number;
  comentarios: number;
  compartidos: number;
}

@Injectable({
  providedIn: 'root'
})
export class SubirContenidoService {

  private publicaciones: Publicacion[] = [
    {
      id: 1,
      usuarioNombre: 'Maiccol Zurita',
      usuarioAvatar: 'images/yo.png',
      comentario: 'Evento del ITQ',
      imagenUrl: 'images/evento.jpg',
      tiempo: '2 hours ago',
      likes: 10,
      comentarios: 3,
      compartidos: 1
    }
  ];

  getPublicaciones(): Publicacion[] {
    return this.publicaciones;
  }

  agregarPublicacion(data: { comentario: string; imagenUrl: string }): void {
    const nueva: Publicacion = {
      id: Date.now(),
      usuarioNombre: 'Maiccol Zurita',
      usuarioAvatar: 'images/yo.png',
      comentario: data.comentario,
      imagenUrl: data.imagenUrl,
      tiempo: 'Justo ahora',
      likes: 0,
      comentarios: 0,
      compartidos: 0
    };

    this.publicaciones.unshift(nueva);
  }

  // 🔹 ESTADO DEL MODAL
  private _modalAbierto = false;

  get modalAbierto(): boolean {
    return this._modalAbierto;
  }

  abrirModal(): void {
    this._modalAbierto = true;
  }

  cerrarModal(): void {
    this._modalAbierto = false;
  }
}
