import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  readonly authService = inject(AuthService);

  // Signals
  readonly email = signal<string>('');
  readonly password = signal<string>('');
  readonly showMicrosoftModal = signal<boolean>(false);

  onEmailLogin(): void {
    this.authService.loginWithEmail(this.email(), this.password());
  }

  openMicrosoftModal(): void {
    this.showMicrosoftModal.set(true);
  }

  closeMicrosoftModal(): void {
    this.showMicrosoftModal.set(false);
  }

  startMicrosoftLogin(): void {
    this.closeMicrosoftModal();
    this.authService.loginWithMicrosoft();
  }
}