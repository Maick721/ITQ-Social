import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
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

  // FORMULARIO REACTIVO
  loginForm = new FormGroup({
    email: new FormControl<string>(''),
    password: new FormControl<string>('')
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get email() { return this.loginForm.get('email')!; }
  get password() { return this.loginForm.get('password')!; }

  // LOGIN
  onLogin() {
    if (this.loginForm.invalid) {
      this.error = 'Completa correctamente los campos.';
      this.loginForm.markAllAsTouched();
      return;
    }

    const formData = this.loginForm.value as { email: string; password: string };

    this.authService.login(formData).subscribe({
      next: () => {
        // despues de iniciar sesion te lleva al componente completar perfil
        this.router.navigate(['completar-perfil']);
      },
      error: () => {
        this.error = 'Correo o contraseña incorrectos';
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
