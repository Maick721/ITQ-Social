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

  toggleNavbar() {
    this.navbarColapsado = !this.navbarColapsado;
  }

abrirModal(): void {
  console.log('🟢 NAVBAR: Botón clickeado - llamando servicio');
  this.subirContenidoService.abrirModal();
  console.log('🟢 NAVBAR: Servicio llamado');
}

  abrirNotificaciones() {
    this.notificacionesService.abrir();
  }
}