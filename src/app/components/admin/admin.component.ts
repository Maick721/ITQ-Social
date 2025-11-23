import { Component } from '@angular/core';
import { PaneladminComponent } from '../paneladmin/paneladmin.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-admin',
  imports: [PaneladminComponent, NavbarComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
