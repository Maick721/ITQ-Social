import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { SubirContenidoComponent } from '../../usuario/subir-contenido/subir-contenido.component';
import { SubirContenidoService } from '../../services/subir-contenido.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SubirContenidoComponent],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  constructor(public subirContenidoService: SubirContenidoService) {}

  usuario = {
    nombre: 'Ana Torres',
    usuario: 'anatorres',
    carrera: 'Diseño Gráfico',
    semestre: 5,
    ubicacion: 'Guayaquil, Ecuador',
    bio: 'Creativa, soñadora y amante del arte digital.',
    amigos: 230,
    publicaciones: 67,
    experiencias: [
      'Hackatón de Innovación 2024',
      'Curso de UX/UI Avanzado',
      'Certificación en Adobe Illustrator',
      'Taller de Diseño 3D'
    ]
  };

  get fotos(): any[] {
    return this.subirContenidoService.getPublicaciones();
  }

  // 👇 Cambiar a any
  fotoSeleccionada: any = null;

  abrirDetalle(foto: any): void {
    this.fotoSeleccionada = foto;
  }

  cerrarDetalle(): void {
    this.fotoSeleccionada = null;
  }

  // Para manejar el evento del hijo
  onPublicada(pub: any): void {
    this.usuario.publicaciones = this.fotos.length;
    console.log('Nueva publicación recibida:', pub);
  }
}