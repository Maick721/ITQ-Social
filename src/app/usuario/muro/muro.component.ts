import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubirContenidoService, Publicacion } from '../../services/subir-contenido.service';

@Component({
  selector: 'app-muro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './muro.component.html',
  styleUrls: ['./muro.component.css']
})
export class MuroComponent implements OnInit {

  publicaciones: Publicacion[] = [];

  constructor(private subirContenidoService: SubirContenidoService) {}

  ngOnInit(): void {
    this.publicaciones = this.subirContenidoService.getPublicaciones();
  }
}
