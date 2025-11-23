import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SubirContenidoService } from '../../services/subir-contenido.service';
import { NotificacionesPanelService } from '../../services/notificaciones-panel.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {

  navbarColapsado: boolean = false;

  constructor(
    private subirContenidoService: SubirContenidoService,
    private notificacionesService: NotificacionesPanelService
  ) {}

abrirModal(): void {
  this.subirContenidoService.abrirModal()
}

  abrirNotificaciones() {
    this.notificacionesService.abrir();
  }
}