import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificacionesPanelService } from '../../services/notificaciones-panel.service';
import { SubirContenidoService } from '../../services/subir-contenido.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  navbarColapsado: boolean = false;

  constructor(
    private notificacionesPanelService: NotificacionesPanelService,
    private subirContenidoService: SubirContenidoService
  ) {}

  toggleNavbar(): void {
    this.navbarColapsado = !this.navbarColapsado;
  }

  abrirNotificaciones() {
    this.notificacionesPanelService.abrir();
  }

  // 👉 Este es el que llama el (click) del navbar
  abrirModalSubirContenido() {
    this.subirContenidoService.abrirModal();
  }
}
