import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificacionesComponent } from './usuario/notificaciones/notificaciones.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NotificacionesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'social';
}
