import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// 🚫 IMPORTANTE: Se elimina la importación de Validators
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  error: string | null = null;
  // Mensajes de error individuales para mostrar en el HTML
  emailError: string | null = null;
  passwordError: string | null = null; 

  // FORMULARIO REACTIVO (sin Validators)
  loginForm = new FormGroup({
    email: new FormControl<string>(''),
    password: new FormControl<string>('')
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // Getters para acceder fácilmente a los controles
  get email() { return this.loginForm.get('email') as any; }
  get password() { return this.loginForm.get('password') as any; }

  // Función de validación manual (devuelve true si es válido)
  private validateFormManually(): boolean {
    this.emailError = null;
    this.passwordError = null;
    let isValid = true;
    
    const emailValue = this.email.value;
    const passwordValue = this.password.value;

    // 1. Validar Email
    if (!emailValue || emailValue.trim() === '') {
      this.emailError = 'El correo electrónico es obligatorio.';
      this.email.markAsTouched();
      isValid = false;
    } else {
      // Validar formato básico de email (algo@algo.algo)
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailValue)) {
        this.emailError = 'Ingresa un formato de email válido.';
        this.email.markAsTouched();
        isValid = false;
      }
    }

    // 2. Validar Contraseña
    if (!passwordValue || passwordValue.trim() === '') {
      this.passwordError = 'La contraseña es obligatoria.';
      this.password.markAsTouched();
      isValid = false;
    }

    // Si hay errores específicos, borramos el error general
    if (!isValid) {
        this.error = 'Por favor, completa correctamente los campos.';
    }

    return isValid;
  }

  // LOGIN
  onLogin() {
    this.error = null;
    
    // Llamamos a la validación manual
    if (!this.validateFormManually()) {
      return; // Detenemos si no es válido
    }

    // El formulario es válido, procedemos con el servicio
    const formData = this.loginForm.value as { email: string; password: string };

    this.authService.login(formData).subscribe({
      next: () => {
        // Redirige al perfil
        this.router.navigate(['/completar-perfil']);
      },
      error: () => {
        // Error del backend (credenciales incorrectas)
        this.error = 'Correo o contraseña incorrectos.';
      }
    });
  }

  onForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  goToRegister() {
    this.router.navigate(['/registro']);
  }
}