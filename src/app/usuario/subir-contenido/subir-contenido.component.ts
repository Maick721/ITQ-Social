import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SubirContenidoService } from '../../services/subir-contenido.service';

@Component({
  selector: 'app-subir-contenido',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subir-contenido.component.html',
  styleUrls: ['./subir-contenido.component.css']
})
export class SubirContenidoComponent {

  comentario: string = '';
  imagenPreview: string | null = null;
  imagenUrlFinal: string | null = null;

  constructor(public subirContenidoService: SubirContenidoService) {}

  cerrarModal() {
    this.subirContenidoService.cerrarModal();
    this.comentario = '';
    this.imagenPreview = null;
    this.imagenUrlFinal = null;
  }

  onArchivoSeleccionado(event: any) {
    const archivo = event.target.files[0];
    if (!archivo) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagenPreview = reader.result as string;
      this.imagenUrlFinal = this.imagenPreview;
    };
    reader.readAsDataURL(archivo);
  }

  publicar() {
    if (!this.comentario.trim() || !this.imagenUrlFinal) {
      alert('Debes seleccionar una imagen y escribir un comentario.');
      return;
    }

    this.subirContenidoService.agregarPublicacion({
      comentario: this.comentario.trim(),
      imagenUrl: this.imagenUrlFinal
    });

    this.cerrarModal();
  }
}
