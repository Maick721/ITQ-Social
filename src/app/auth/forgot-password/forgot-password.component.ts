import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  errorMessage: string | null = null;
  successMessage: string | null = null;
  
  // Define el formulario reactivo con un solo control.
  forgotPasswordForm = new FormGroup({
    email: new FormControl('')
  });

  // Getter para acceder fácilmente al control 'email' en la vista.
  get email() {
    return this.forgotPasswordForm.get('email') as any; 
  }

  // Inyectamos el Router para la navegación.
  constructor(private router: Router) { }

  // Función principal al enviar el formulario.
  onSubmit() {
    this.errorMessage = null;
    this.successMessage = null;

    const inputEmail = this.forgotPasswordForm.value.email;

    // --- 1. VALIDACIÓN MANUAL: Campo vacío ---
    if (!inputEmail || inputEmail.trim() === '') {
      this.errorMessage = 'El campo de correo electrónico es obligatorio.';
      this.email.markAsTouched(); // Marca el control para mostrar el error en el HTML.
      return;
    }
    
    // --- 2. VALIDACIÓN MANUAL: Formato de correo electrónico básico ---
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(inputEmail)) {
        this.errorMessage = 'Ingresa un formato de correo electrónico válido.';
        this.email.markAsTouched();
        return;
    }
    
    // --- Lógica de envío (Simulación) ---
    console.log('Solicitud de recuperación enviada para:', inputEmail);

    setTimeout(() => {
      this.successMessage = `Se ha enviado un enlace de restablecimiento a ${inputEmail}. Revisa tu bandeja de entrada.`;
      this.forgotPasswordForm.reset(); 
    }, 2000);
  }

  // Navegación de vuelta al login.
  goToLogin() {
    this.router.navigate(['/login']); 
  }
}