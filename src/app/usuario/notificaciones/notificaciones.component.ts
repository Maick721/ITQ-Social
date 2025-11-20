import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { NotificacionesService } from '../../services/notificaciones.service';
import { NotificacionesPanelService } from '../../services/notificaciones-panel.service';
import { Notificacion } from '../../models/notificacion.model';

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notificaciones.component.html',
  styleUrl: './notificaciones.component.css'
})
export class NotificacionesComponent implements OnInit, OnDestroy {
  
  notificaciones: Notificacion[] = [];
  notificacionesFiltradas: Notificacion[] = [];
  filtroActual: 'todas' | 'noLeidas' = 'todas';
  notificacionesNoLeidas: number = 0;
  isOpen: boolean = false; // Controla si el panel está abierto
  
  private subscriptions: Subscription = new Subscription();

  constructor(
    private notificacionesService: NotificacionesService,
    private notificacionesPanelService: NotificacionesPanelService
  ) {}

  ngOnInit(): void {
    // Suscribirse al estado del panel
    this.subscriptions.add(
      this.notificacionesPanelService.isOpen$.subscribe(
        isOpen => this.isOpen = isOpen
      )
    );

    // Suscribirse a las notificaciones
    this.subscriptions.add(
      this.notificacionesService.obtenerNotificaciones().subscribe(
        notificaciones => {
          this.notificaciones = notificaciones;
          this.aplicarFiltro();
        }
      )
    );

    // Suscribirse al contador de notificaciones no leídas
    this.subscriptions.add(
      this.notificacionesService.obtenerContadorNoLeidas().subscribe(
        contador => this.notificacionesNoLeidas = contador
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  // Aplicar filtro a las notificaciones
  aplicarFiltro(): void {
    if (this.filtroActual === 'noLeidas') {
      this.notificacionesFiltradas = this.notificaciones.filter(n => !n.leida);
    } else {
      this.notificacionesFiltradas = this.notificaciones;
    }
  }

  // Cambiar filtro
  cambiarFiltro(filtro: 'todas' | 'noLeidas'): void {
    this.filtroActual = filtro;
    this.aplicarFiltro();
  }

  // Marcar notificación como leída
  marcarComoLeida(notificacion: Notificacion): void {
    if (!notificacion.leida) {
      this.notificacionesService.marcarComoLeida(notificacion.id);
    }
  }

  // Marcar todas como leídas
  marcarTodasComoLeidas(): void {
    this.notificacionesService.marcarTodasComoLeidas();
  }

  // Eliminar notificación
  eliminarNotificacion(event: Event, notificacionId: number): void {
    event.stopPropagation();
    this.notificacionesService.eliminarNotificacion(notificacionId);
  }

  // Obtener el ícono según el tipo de notificación
  obtenerIcono(tipo: string): string {
    const iconos: { [key: string]: string } = {
      'like': '❤️',
      'comentario': '💬',
      'amistad': '👥',
      'publicacion': '📷',
      'etiqueta': '🏷️',
      'compartir': '🔄'
    };
    return iconos[tipo] || '🔔';
  }

  // Calcular el tiempo transcurrido
  obtenerTiempoTranscurrido(fecha: Date): string {
    const ahora = new Date();
    const diferencia = ahora.getTime() - new Date(fecha).getTime();
    
    const minutos = Math.floor(diferencia / 60000);
    const horas = Math.floor(diferencia / 3600000);
    const dias = Math.floor(diferencia / 86400000);

    if (minutos < 1) return 'Ahora';
    if (minutos < 60) return `${minutos}m`;
    if (horas < 24) return `${horas}h`;
    if (dias < 7) return `${dias}d`;
    if (dias < 30) return `${Math.floor(dias / 7)}sem`;
    return `${Math.floor(dias / 30)}mes`;
  }

  // Abrir panel de notificaciones
  abrirPanel(): void {
    this.notificacionesPanelService.abrir();
  }

  // Cerrar panel de notificaciones
  cerrarPanel(): void {
    this.notificacionesPanelService.cerrar();
  }

  // Toggle del panel
  togglePanel(): void {
    this.notificacionesPanelService.toggle();
  }
}
