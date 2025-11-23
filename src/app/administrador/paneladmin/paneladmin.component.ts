import { Component } from '@angular/core';
//Importamos el CommonModule para usar directivas aprendidas de Angular

import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';


@Component({
  selector: 'app-paneladmin',
  standalone: true, //Indicamos que es un componente independiente activando standalone
  imports: [NavbarComponent, CommonModule],
  templateUrl: './paneladmin.component.html',
  styleUrl: './paneladmin.component.css'
})


export class PaneladminComponent {

  // Tarjetas superiores (estadísticas rápidas)
  stats = [
    { titulo: 'Publicaciones activas', valor: 120 },
    { titulo: 'Usuarios registrados', valor: 1530 },
    { titulo: 'Reportes de contenido', valor: 8 }
  ];

  // Publicaciones simuladas
  publicaciones = [
    { usuario: 'Maicol Zurita', contenido: 'Evento del ITQ', fecha: 'Hace 3 horas' },
    { usuario: 'Jane Smith', contenido: 'Invitación a charla educativa', fecha: 'Hace 1 día' },
    { usuario: 'Carios M.', contenido: 'Nuevo artículo de desarrollo web', fecha: 'Hace 2 días' },
    { usuario: 'Laura G.', contenido: 'Fotos del campus', fecha: 'Hace 3 días' }
  ];

  // Usuarios simulados
  usuarios = [
    { nombre: 'Maicol Zurita', email: 'maicol.zurita@example.com', rol: 'Miembro' },
    { nombre: 'Jane Smith', email: 'jane.smith@example.com', rol: 'Moderador' }
  ];

  editar(item: any) {
    console.log('Editar →', item);
  }

  eliminar(item: any) {
    console.log('Eliminar →', item);
  }

}
