import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  // Datos del usuario simulados
  usuario = {
    fotoUrl: 'assets/img/perfil.jpg',
    nombre: 'Ana Torres',
    usuario: '@anatorres',
    carrera: 'Diseño Gráfico',
    ubicacion: 'Guayaquil, Ecuador',
    bio: 'Creativa, soñadora y amante del arte digital.',
    amigos: 230,
    publicaciones: 67
  };

  // Galería de fotos simuladas
  fotos = [
    {
      url: 'images/logo.png',
      fecha: '2025-11-01',
      descripcion: 'Proyecto final de ilustración',
      likes: 120,
      comentarios: ['¡Increíble trabajo!', 'Me encanta el estilo'],
      compartidos: 15
    },
    {
      url: 'assets/img/foto2.jpg',
      fecha: '2025-11-10',
      descripcion: 'Exposición en la universidad',
      likes: 98,
      comentarios: ['¡Felicitaciones!', 'Muy inspirador'],
      compartidos: 10
    }
  ];

  // Estado de la foto seleccionada (detalle)
  fotoSeleccionada = signal<typeof this.fotos[0] | null>(null);

  // Abrir panel de detalle
  abrirDetalle(foto: typeof this.fotos[0]): void {
    this.fotoSeleccionada.set(foto);
  }

  // Cerrar panel de detalle
  cerrarDetalle(): void {
    this.fotoSeleccionada.set(null);
  }
}