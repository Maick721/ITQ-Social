import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onRegister() {
    this.error = '';

    const formData = this.registroForm.value;

    // Validaciones
    if (!formData.nombre) {
      this.error = 'Ingresa tu nombre';
      return;
    }

    if (!formData.apellido) {
      this.error = 'Ingresa tu apellido';
      return;
    }

    if (!formData.email) {
      this.error = 'Ingresa tu email';
      return;
    }

    // Validar email institucional
    if (!formData.email.includes('@itq.edu.ec')) {
      this.error = 'Debes usar tu correo institucional (@itq.edu.ec)';
      return;
    }

    if (!formData.password) {
      this.error = 'Ingresa una contraseña';
      return;
    }

    if (formData.password.length < 6) {
      this.error = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }

    if (!formData.confirmPassword) {
      this.error = 'Confirma tu contraseña';
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      this.error = 'Las contraseñas no coinciden';
      return;
    }

    // Si todo está bien
    this.authService.register(formData).subscribe({
      next: (response) => {
        alert('Registro exitoso');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.error = 'Error al registrarse. Intenta nuevamente.';
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}