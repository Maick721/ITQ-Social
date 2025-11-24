import { Injectable } from '@angular/core';
import {  BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubirContenidoService {
  private modalAbierto = new BehaviorSubject<boolean>(false);
  modalAbierto$ = this.modalAbierto.asObservable();

  private publicaciones: any[] = [
    {
      id: 1,
      url: 'https://picsum.photos/500/500?random=1',
      descripcion: 'Mi primera publicación en ITQ Social!',
      fecha: '2024-01-15',
      likes: 15,
      comentarios: [],
      compartidos: 2
    },
    {
      id: 2,
      url: 'https://picsum.photos/500/500?random=2',
      descripcion: 'Disfrutando del campus ITQ',
      fecha: '2024-01-14',
      likes: 23,
      comentarios: [],
      compartidos: 5
    }
  ];

  private publicacionesSubject = new BehaviorSubject<any[]>(this.publicaciones);
  public publicaciones$ = this.publicacionesSubject.asObservable();

  // Método para abrir modal
abrirModal(): void {
  this.modalAbierto.next(true);
}
  cerrarModal(): void {
    this.modalAbierto.next(false);
  }

  // Método para obtener publicaciones
  getPublicaciones(): any[] {
    return this.publicaciones;
  }

  // Método para agregar publicación
  agregarPublicacion(publicacion: any): void {
    const nuevaPublicacion = {
      ...publicacion,
      id: Date.now(), // ID único
      likes: 0,
      comentarios: [],
      compartidos: 0
    };
    this.publicaciones.unshift(nuevaPublicacion); // Agregar al inicio
    this.publicacionesSubject.next([...this.publicaciones]);
  }
}