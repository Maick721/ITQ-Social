import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-mensajes',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent {

  @ViewChild('mensajeInput') mensajeInput!: ElementRef<HTMLInputElement>;

  chatSeleccionado: any = null;
  imagenError: string = '';
  imagenNombre: string = '';
  imagenPrevisualizacion: string = '';
  mostrarModalImagen: boolean = false;
  imagenParaEnviar: any = null;

  chats = [
    {
      nombre: "Ana Torres",
      foto: "assets/usuarios/user1.jpg",
      ultimoMensaje: "Hola! Como va tu proyecto?",
      mensajes: [
        { de: "Ana", texto: "Hola! Como va tu proyecto?" },
        { de: "Yo", texto: "Todo bien, gracias" },
        { de: "Ana", texto: "Que bueno saberlo" }
      ]
    },
    {
      nombre: "Kevin Morales",
      foto: "assets/usuarios/user2.jpg", 
      ultimoMensaje: "Te mande los archivos",
      mensajes: [
        { de: "Kevin", texto: "Te mande los archivos" },
        { de: "Yo", texto: "Genial, gracias bro" }
      ]
    }
  ];

  abrirChat(chat: any) {
    this.chatSeleccionado = chat;
  }

  cerrarChat() {
    this.chatSeleccionado = null;
  }

  enviarMensaje() {
    const texto = this.mensajeInput.nativeElement.value.trim();
    if (!texto || !this.chatSeleccionado) return;

    this.chatSeleccionado.mensajes.push({ de: 'Yo', texto });
    this.mensajeInput.nativeElement.value = '';
    this.chatSeleccionado.ultimoMensaje = texto;
  }

  seleccionarImagen() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (!file || !this.chatSeleccionado) return;

      const maxSize = 5 * 1024 * 1024; // 5MB

      if (file.size > maxSize) {
        this.imagenError = 'La imagen no puede pesar más de 5 MB.';
        return;
      }

      this.imagenError = '';
      this.imagenNombre = file.name;

      // Previsualizar imagen en modal
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenPrevisualizacion = e.target.result;
        this.imagenParaEnviar = {
          url: e.target.result,
          nombre: file.name,
          file: file
        };
        this.mostrarModalImagen = true; // ABRIR MODAL AQUÍ
      };
      
      reader.readAsDataURL(file);
    };

    input.click();
  }

  enviarImagen() {
    if (!this.imagenParaEnviar || !this.chatSeleccionado) return;

    // Agregar mensaje con imagen
    this.chatSeleccionado.mensajes.push({
      de: 'Yo',
      texto: 'Imagen enviada:',
      imagen: this.imagenParaEnviar.url,
      nombreArchivo: this.imagenParaEnviar.nombre
    });

    // Actualizar último mensaje
    this.chatSeleccionado.ultimoMensaje = 'Imagen: ' + this.imagenParaEnviar.nombre;

    // Cerrar modal y limpiar
    this.cancelarImagen();
  }

  cancelarImagen() {
    this.mostrarModalImagen = false;
    this.imagenPrevisualizacion = '';
    this.imagenParaEnviar = null;
    this.imagenNombre = '';
  }
}