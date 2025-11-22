import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { MuroComponent } from '../../usuario/muro/muro.component';
import { SubirContenidoComponent } from '../../usuario/subir-contenido/subir-contenido.component'

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, MuroComponent, SubirContenidoComponent, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'    
})
export class HomeComponent {

}
