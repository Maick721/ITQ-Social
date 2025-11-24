import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  
  private notificacionesSubject = new BehaviorSubject<any[]>(this.obtenerNotificacionesMock());
  public notificaciones$ = this.notificacionesSubject.asObservable();

  private notificacionesNoLeidasSubject = new BehaviorSubject<number>(this.contarNoLeidas());
  public notificacionesNoLeidas$ = this.notificacionesNoLeidasSubject.asObservable();

  constructor() { }

  // Método para obtener notificaciones (actualmente con datos mock)
  obtenerNotificaciones(): Observable<any[]> {
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
  private obtenerNotificacionesMock(): any[] {
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
        fecha: new Date(ahora.getTime() - 5 * 60000),
        leida: false,
        imagen: 'https://picsum.photos/200/200?random=1',
        enlace: '/muro'
      },

    ];
  }
}