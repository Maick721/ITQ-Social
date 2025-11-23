import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PerfilService, PerfilUsuario } from '../../services/perfil.service';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent {

  // Foto actual del usuario
  fotoPreview: string | null = null;

  // Formulario (sin string genéricos, sin Validators)
  perfilForm = new FormGroup({
    nombre:   new FormControl(''),
    carrera:  new FormControl(''),
    semestre: new FormControl(1),
    bio:      new FormControl('')
  });

  constructor(
    private perfilService: PerfilService,
    private router: Router
  ) {
    // Cargar datos guardados del perfil
    const perfil = this.perfilService.getPerfil();

    if (perfil) {
      this.perfilForm.patchValue({
        nombre:   perfil.nombre,
        carrera:  perfil.carrera,
        semestre: perfil.semestre,
        bio:      perfil.bio
      });

      this.fotoPreview = perfil.fotoUrl;
    }
  }

  guardarCambios() {
    const valores = this.perfilForm.value;

    const perfil: PerfilUsuario = {
      nombre:   valores.nombre || '',
      carrera:  valores.carrera || '',
      semestre: (valores.semestre as number) || 1,
      bio:      valores.bio || '',
      fotoUrl:  this.fotoPreview  // usamos la misma foto que ya tenía guardada
    };

    this.perfilService.guardarPerfil(perfil);
    this.router.navigate(['/usuario/perfil']);
  }

  cancelar() {
    this.router.navigate(['/usuario/perfil']);
  }
}
