import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { MuroComponent } from '../muro/muro.component'; 

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, MuroComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
