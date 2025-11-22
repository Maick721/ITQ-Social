import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubirContenidoService } from '../../services/subir-contenido.service';

@Component({
  selector: 'app-muro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './muro.component.html',
  styleUrls: ['./muro.component.css']
})
export class MuroComponent implements OnInit {

  publicaciones: any[] = [];

  constructor(private subirContenidoService: SubirContenidoService) {}

  ngOnInit(): void {
    this.publicaciones = this.subirContenidoService.getPublicaciones();
  }
}