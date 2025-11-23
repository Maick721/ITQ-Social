import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { SubirContenidoComponent } from '../../usuario/subir-contenido/subir-contenido.component';
import { SubirContenidoService } from '../../services/subir-contenido.service';
import { PerfilService } from '../../services/perfil.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SubirContenidoComponent],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  constructor(
    public subirContenidoService: SubirContenidoService,
    private perfilService: PerfilService
  ) {}

  usuario: any = null;

  ngOnInit() {
    this.usuario = this.perfilService.getPerfil();

    // Si NO existe perfil, lo mando a completar-perfil
    if (!this.usuario || !this.usuario.nombre) {
      window.location.href = '/completar-perfil';
    }
  }

  get fotos(): any[] {
    return this.subirContenidoService.getPublicaciones();
  }

  fotoSeleccionada: any = null;

  abrirDetalle(foto: any): void {
    this.fotoSeleccionada = foto;
  }

  cerrarDetalle(): void {
    this.fotoSeleccionada = null;
  }

  onPublicada(pub: any): void {
    if (this.usuario) {
      this.usuario.publicaciones = this.fotos.length;
    }
  }
}
