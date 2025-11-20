import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotificacionesPanelService } from '../../services/notificaciones-panel.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  navbarColapsado: boolean = false;

  constructor(private notificacionesPanelService: NotificacionesPanelService) {}

  abrirNotificaciones(): void {
    this.notificacionesPanelService.toggle();
  }

  toggleNavbar(): void {
    this.navbarColapsado = !this.navbarColapsado;
  }
}
