import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubirContenidoService } from '../../services/subir-contenido.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subir-contenido',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subir-contenido.component.html',
  styleUrls: ['./subir-contenido.component.css']
})
export class SubirContenidoComponent implements OnDestroy {
  
  // CAMBIA ESTO: haz la variable pública para probar
  public modalAbierto: boolean = false;
  
  private subscription: Subscription;

  nueva: any = {
    url: '',
    descripcion: '',
    likes: 0,
    comentarios: [],
    compartidos: 0
  };

  @Output() publicada = new EventEmitter<any>();

  constructor(private subirContenidoService: SubirContenidoService) {
    this.subscription = this.subirContenidoService.modalAbierto$.subscribe(
      abierto => {
        this.modalAbierto = abierto;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.nueva.url = String(reader.result);
    };
    reader.readAsDataURL(file);
  }

  onDescripcionChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.nueva.descripcion = input.value;
  }

  publicar(): void {
    if (!this.nueva.url || !this.nueva.descripcion) return;

    const fechaHoy = new Date().toISOString().slice(0, 10);

    const publicacion = {
      ...this.nueva,
      fecha: fechaHoy
    };

    this.subirContenidoService.agregarPublicacion(publicacion);
    this.publicada.emit(publicacion);

    this.cerrarModal();
  }

  cerrarModal(): void {
    this.subirContenidoService.cerrarModal();
    this.resetForm();
  }

  private resetForm(): void {
    this.nueva = {
      url: '',
      descripcion: '',
      likes: 0,
      comentarios: [],
      compartidos: 0
    };
  }
}