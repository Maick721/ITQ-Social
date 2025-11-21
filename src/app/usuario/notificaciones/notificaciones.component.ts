import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionesService } from '../../services/notificaciones.service';
import { NotificacionesPanelService } from '../../services/notificaciones-panel.service';
import { Notificacion } from '../../models/notificacion.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {

  // Estado del panel
  isOpen: boolean = false;

  // Lista de notificaciones
  notificaciones: Notificacion[] = [];
  filtroActual: 'todas' | 'noLeidas' = 'todas';
  notificacionesNoLeidas: number = 0;

  private subs: Subscription[] = [];

  constructor(
    private notificacionesService: NotificacionesService,
    private panelService: NotificacionesPanelService
  ) {}

  ngOnInit(): void {
    // Suscribirse al estado del panel
    this.subs.push(
      this.panelService.isOpen$.subscribe(open => this.isOpen = open)
    );

    // Suscribirse a las notificaciones
    this.subs.push(
      this.notificacionesService.obtenerNotificaciones().subscribe(n => this.notificaciones = n)
    );

    // Suscribirse al contador de no leídas
    this.subs.push(
      this.notificacionesService.obtenerContadorNoLeidas().subscribe(c => this.notificacionesNoLeidas = c)
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  // Abrir/cerrar panel
  cerrarPanel(): void {
    this.panelService.cerrar();
  }

  // Filtros
  cambiarFiltro(filtro: 'todas' | 'noLeidas'): void {
    this.filtroActual = filtro;
  }

  get notificacionesFiltradas(): Notificacion[] {
    return this.filtroActual === 'noLeidas'
      ? this.notificaciones.filter(n => !n.leida)
      : this.notificaciones;
  }

  // Acciones sobre notificaciones
  marcarComoLeida(n: Notificacion): void {
    this.notificacionesService.marcarComoLeida(n.id);
  }

  marcarTodasComoLeidas(): void {
    this.notificacionesService.marcarTodasComoLeidas();
  }

  eliminarNotificacion(event: Event, id: number): void {
    event.stopPropagation();
    this.notificacionesService.eliminarNotificacion(id);
  }

  // Helpers
  obtenerIcono(tipo: string): string {
    switch (tipo) {
      case 'like': return 'fa-solid fa-heart text-danger';
      case 'comentario': return 'fa-solid fa-comment text-primary';
      case 'publicacion': return 'fa-solid fa-image text-success';
      case 'amistad': return 'fa-solid fa-user-plus text-info';
      case 'etiqueta': return 'fa-solid fa-tag text-warning';
      case 'compartir': return 'fa-solid fa-share text-secondary';
      default: return 'fa-solid fa-bell';
    }
  }

  obtenerTiempoTranscurrido(fecha: Date): string {
    const ahora = new Date();
    const diffMs = ahora.getTime() - new Date(fecha).getTime();
    const diffMin = Math.floor(diffMs / 60000);

    if (diffMin < 1) return 'Hace unos segundos';
    if (diffMin < 60) return `Hace ${diffMin} min`;
    const diffHoras = Math.floor(diffMin / 60);
    if (diffHoras < 24) return `Hace ${diffHoras} h`;
    const diffDias = Math.floor(diffHoras / 24);
    return `Hace ${diffDias} días`;
  }
}