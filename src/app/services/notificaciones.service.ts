import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Notificacion } from '../models/notificacion.model';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  
  private notificacionesSubject = new BehaviorSubject<Notificacion[]>(this.obtenerNotificacionesMock());
  public notificaciones$ = this.notificacionesSubject.asObservable();

  private notificacionesNoLeidasSubject = new BehaviorSubject<number>(this.contarNoLeidas());
  public notificacionesNoLeidas$ = this.notificacionesNoLeidasSubject.asObservable();

  constructor() { }

  // Método para obtener notificaciones (actualmente con datos mock)
  obtenerNotificaciones(): Observable<Notificacion[]> {
    return this.notificaciones$;
  }

  // Método para marcar una notificación como leída
  marcarComoLeida(notificacionId: number): void {
    const notificaciones = this.notificacionesSubject.value;
    const notificacion = notificaciones.find(n => n.id === notificacionId);
    if (notificacion && !notificacion.leida) {
      notificacion.leida = true;
      this.notificacionesSubject.next([...notificaciones]);
      this.actualizarContadorNoLeidas();
    }
  }

  // Método para marcar todas como leídas
  marcarTodasComoLeidas(): void {
    const notificaciones = this.notificacionesSubject.value.map(n => ({...n, leida: true}));
    this.notificacionesSubject.next(notificaciones);
    this.actualizarContadorNoLeidas();
  }

  // Método para eliminar una notificación
  eliminarNotificacion(notificacionId: number): void {
    const notificaciones = this.notificacionesSubject.value.filter(n => n.id !== notificacionId);
    this.notificacionesSubject.next(notificaciones);
    this.actualizarContadorNoLeidas();
  }

  // Método para obtener el contador de notificaciones no leídas
  obtenerContadorNoLeidas(): Observable<number> {
    return this.notificacionesNoLeidas$;
  }

  // Métodos privados auxiliares
  private contarNoLeidas(): number {
    return this.notificacionesSubject.value.filter(n => !n.leida).length;
  }

  private actualizarContadorNoLeidas(): void {
    this.notificacionesNoLeidasSubject.next(this.contarNoLeidas());
  }

  // Datos mock para desarrollo
  private obtenerNotificacionesMock(): Notificacion[] {
    const ahora = new Date();
    return [
      {
        id: 1,
        tipo: 'like',
        usuarioEmisor: {
          id: 101,
          nombre: 'María González',
          avatar: 'https://i.pravatar.cc/150?img=1'
        },
        mensaje: 'le dio like a tu foto',
        fecha: new Date(ahora.getTime() - 5 * 60000), // hace 5 minutos
        leida: false,
        imagen: 'https://picsum.photos/200/200?random=1',
        enlace: '/muro'
      },
      {
        id: 2,
        tipo: 'publicacion',
        usuarioEmisor: {
          id: 102,
          nombre: 'Carlos Ramírez',
          avatar: 'https://i.pravatar.cc/150?img=2'
        },
        mensaje: 'publicó una nueva foto',
        fecha: new Date(ahora.getTime() - 30 * 60000), // hace 30 minutos
        leida: false,
        imagen: 'https://picsum.photos/200/200?random=2',
        enlace: '/muro'
      },
      {
        id: 3,
        tipo: 'comentario',
        usuarioEmisor: {
          id: 103,
          nombre: 'Ana Martínez',
          avatar: 'https://i.pravatar.cc/150?img=3'
        },
        mensaje: 'comentó tu publicación: "¡Qué genial!"',
        fecha: new Date(ahora.getTime() - 60 * 60000), // hace 1 hora
        leida: false,
        imagen: 'https://picsum.photos/200/200?random=3',
        enlace: '/muro'
      },
      {
        id: 4,
        tipo: 'amistad',
        usuarioEmisor: {
          id: 104,
          nombre: 'Luis Hernández',
          avatar: 'https://i.pravatar.cc/150?img=4'
        },
        mensaje: 'aceptó tu solicitud de amistad',
        fecha: new Date(ahora.getTime() - 2 * 60 * 60000), // hace 2 horas
        leida: true,
        enlace: '/amigos'
      },
      {
        id: 5,
        tipo: 'like',
        usuarioEmisor: {
          id: 105,
          nombre: 'Sofia López',
          avatar: 'https://i.pravatar.cc/150?img=5'
        },
        mensaje: 'le dio like a tu comentario',
        fecha: new Date(ahora.getTime() - 3 * 60 * 60000), // hace 3 horas
        leida: true,
        enlace: '/muro'
      },
      {
        id: 6,
        tipo: 'etiqueta',
        usuarioEmisor: {
          id: 106,
          nombre: 'Pedro Sánchez',
          avatar: 'https://i.pravatar.cc/150?img=6'
        },
        mensaje: 'te etiquetó en una foto',
        fecha: new Date(ahora.getTime() - 5 * 60 * 60000), // hace 5 horas
        leida: true,
        imagen: 'https://picsum.photos/200/200?random=4',
        enlace: '/muro'
      },
      {
        id: 7,
        tipo: 'compartir',
        usuarioEmisor: {
          id: 107,
          nombre: 'Laura Torres',
          avatar: 'https://i.pravatar.cc/150?img=7'
        },
        mensaje: 'compartió tu publicación',
        fecha: new Date(ahora.getTime() - 24 * 60 * 60000), // hace 1 día
        leida: true,
        imagen: 'https://picsum.photos/200/200?random=5',
        enlace: '/muro'
      },
      {
        id: 8,
        tipo: 'publicacion',
        usuarioEmisor: {
          id: 108,
          nombre: 'Miguel Ángel Ruiz',
          avatar: 'https://i.pravatar.cc/150?img=8'
        },
        mensaje: 'publicó algo nuevo',
        fecha: new Date(ahora.getTime() - 2 * 24 * 60 * 60000), // hace 2 días
        leida: true,
        imagen: 'https://picsum.photos/200/200?random=6',
        enlace: '/muro'
      }
    ];
  }
}
