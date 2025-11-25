import { Component, NgZone } from '@angular/core';
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

  fotoPreview: string | null = null;
  // Almacena la URL temporalmente si se selecciona una nueva
  nuevaFotoUrl: string | null = null; 

  perfilForm = new FormGroup({
    nombre:   new FormControl(''),
    carrera:  new FormControl(''),
    semestre: new FormControl(0),
    bio:      new FormControl(''),
    fotoUrl:  new FormControl(null) 
  });

  constructor(
    private perfilService: PerfilService,
    private router: Router,
    private zone: NgZone 
  ) {
    this.cargarPerfil();
  }

  // Guardamos nuestro perfil
  cargarPerfil() {
    const perfil = this.perfilService.getPerfil();

    if (perfil) {
      this.perfilForm.patchValue({
        nombre:perfil.nombre,
        carrera: perfil.carrera,
        semestre: perfil.semestre,
        bio: perfil.bio
        // No cargamos fotoUrl del perfil directamente al form, sino a fotoPreview
      });

      // Usamos el valor guardado para la previsualización inicial
      this.fotoPreview = perfil.fotoUrl;
      // Guardamos la URL existente en nuevaFotoUrl para usarla si no se cambia la foto
      this.nuevaFotoUrl = perfil.fotoUrl;
    }
  }

  onFotoSeleccionada(event: any) {
    const archivo: File = event.target.files[0];
    if (!archivo) return;

    const reader = new FileReader();
    
    reader.onload = () => {
      this.zone.run(() => { 
          // 1. Convertir a Data URL y actualizar la previsualización
          this.fotoPreview = reader.result as string; 
          // 2. Guardar la nueva URL temporalmente para el guardado
          this.nuevaFotoUrl = reader.result as string; 
      });
    };
    
    reader.readAsDataURL(archivo);
  }

  guardarCambios() {
    const valores = this.perfilForm.value;

    const perfil: PerfilUsuario = {
      nombre:   valores.nombre ?? '',
      carrera:  valores.carrera ?? '',
      semestre: (valores.semestre as number) ?? 1,
      bio:      valores.bio ?? '',
      // Usamos la URL almacenada en nuevaFotoUrl
      fotoUrl:  this.nuevaFotoUrl 
    };

    this.perfilService.guardarPerfil(perfil);
    this.router.navigate(['/usuario/perfil']);
  }

  cancelar() {
    this.router.navigate(['/usuario/perfil']);
  }
}