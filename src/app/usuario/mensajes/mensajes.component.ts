import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { SubirContenidoComponent } from '../../usuario/subir-contenido/subir-contenido.component';



@Component({
  selector: 'app-mensajes',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, SubirContenidoComponent],
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent {

  chatSeleccionado: any = null;   // ✔ AQUÍ VA
  mensajeTexto: string = '';
  imagenError: string = '';
  imagenNombre: string = '';

  chats = [
    {
      nombre: "Ana Torres",
      foto: "assets/usuarios/user1.jpg",
      ultimoMensaje: "¡Hola! ¿Cómo va tu proyecto?",
      mensajes: [
        { de: "Ana", texto: "¡Hola! ¿Cómo va tu proyecto?" },
        { de: "Yo", texto: "Todo bien, gracias :)" },
        { de: "Ana", texto: "Qué bueno saberlo 👌" }
      ]
    },
    {
      nombre: "Kevin Morales",
      foto: "assets/usuarios/user2.jpg",
      ultimoMensaje: "Te mandé los archivos 📎",
      mensajes: [
        { de: "Kevin", texto: "Te mandé los archivos 📎" },
        { de: "Yo", texto: "¡Genial, gracias bro!" }
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
    const texto = this.mensajeTexto.trim();
    if (!texto) return;

    this.chatSeleccionado.mensajes.push({ de: 'Yo', texto });
    this.mensajeTexto = '';
  }

  onImagenSeleccionada(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const maxSize = 5 * 1024 * 1024 * 1024; // 5GB

    if (file.size > maxSize) {
      this.imagenError = 'La imagen no puede pesar más de 5 GB.';
      return;
    }

    this.imagenError = '';
    this.imagenNombre = file.name;

    this.chatSeleccionado.mensajes.push({
      de: 'Yo',
      texto: `📎 Imagen enviada: ${file.name}`
    });

    input.value = '';
  }
}
