import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { SubirContenidoComponent } from '../../usuario/subir-contenido/subir-contenido.component';
import { SubirContenidoService } from '../../services/subir-contenido.service';
import { PerfilService } from '../../services/perfil.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, SubirContenidoComponent],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  usuario: any = null;
  fotoSeleccionada: any = null;

  constructor(
    public subirContenidoService: SubirContenidoService,
    private perfilService: PerfilService,
    private router: Router
  ) {}

  ngOnInit() {
    this.usuario = this.perfilService.getPerfil();

    // Si NO existe perfil -> redirigir usando Router
    if (!this.usuario || !this.usuario.nombre) {
      this.router.navigate(['/completar-perfil']);
    }
  }

  get fotos(): any[] {
    return this.subirContenidoService.getPublicaciones();
  }

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
