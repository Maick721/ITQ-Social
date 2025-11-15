import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface UsuarioLogin {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  usuario: UsuarioLogin = {
    email: '',
    password: ''
  };

  constructor(private router: Router) {}

  onLogin(): void {
    // Solo se ejecutará si el formulario es válido
    console.log('Login exitoso:', this.usuario);
    this.router.navigate(['/home']);
  }

  onRegister(): void {
    this.router.navigate(['/registro']);
  }

  onForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }
}