import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';  // ← Ruta corregida

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './inicio.component.html',  // ← Sin "/" al inicio
  styleUrl: './inicio.component.css'       // ← Sin "/" al inicio
})
export class InicioComponent {
  private authService = inject(AuthService);  // ← "inject" minúscula
  
  readonly usuario = this.authService.usuario;
  readonly estadisticas = signal({
    amigos: 24,
    publicaciones: 156,
    notificaciones: 3
  });

  readonly novedades = signal([  // ← Agregar [] para array
    {
      titulo: 'Bienvenido a itq-Social',  // ← "titulo" corregido
      descripcion: 'Conecta con amigos y comparte tus momentos',  // ← "descripcion" corregido
      icono: '🎉'
    },
    {
      titulo: 'Nueva función',  // ← "titulo" corregido
      descripcion: 'Ahora puedes enviar mensajes privados',  // ← "descripcion" corregido
      icono: '✨'
    }
  ]);
}