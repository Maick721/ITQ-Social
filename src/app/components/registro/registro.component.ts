import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Usuario {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.component.html'
})
export class RegistroComponent {

  usuario: Usuario = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private router: Router) {}

  onRegister(): void {
    // 1. Primero validamos las contraseñas
    if (this.usuario.password !== this.usuario.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    // 2. Si todo está bien, registramos
    console.log('Registrando:', this.usuario);
    alert('Te hemos enviado un correo de verificación');
    
    // 3. Vamos al login
    this.router.navigate(['/login']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}