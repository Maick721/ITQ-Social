import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { MuroComponent } from '../../usuario/muro/muro.component';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, MuroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'    
})
export class HomeComponent {

}
