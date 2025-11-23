import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PerfilService, PerfilUsuario } from '../../services/perfil.service';

@Component({
  selector: 'app-completar-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './completar-perfil.component.html',
  styleUrls: ['./completar-perfil.component.css']
})
export class CompletarPerfilComponent {

  fotoPreview: string | null = null;

  perfilForm = new FormGroup({
    nombre:   new FormControl<string>('', Validators.required),
    carrera:  new FormControl<string>('', Validators.required),
    semestre: new FormControl<number | null>(null, Validators.required),
    bio:      new FormControl<string>('', Validators.required),
    fotoUrl:  new FormControl<string | null>(null)
  });

  constructor(
    private perfilService: PerfilService,
    private router: Router
  ) {}

  onFotoSeleccionada(event: any) {
    const archivo = event.target.files[0];
    if (!archivo) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.fotoPreview = reader.result as string;
      this.perfilForm.patchValue({ fotoUrl: this.fotoPreview });
    };
    reader.readAsDataURL(archivo);
  }

guardarPerfil() {
  if (this.perfilForm.invalid) {
    this.perfilForm.markAllAsTouched();
    return;
  }

  const valores = this.perfilForm.value;

  // Foto final (puede ser null)
  let foto: string | null = null;

  if (valores.fotoUrl) {
    foto = valores.fotoUrl;
  } else if (this.fotoPreview) {
    foto = this.fotoPreview;
  }

  const perfil: PerfilUsuario = {
    nombre:   valores.nombre!,   
    carrera:  valores.carrera!,
    semestre: valores.semestre!,  
    bio:      valores.bio!,
    fotoUrl:  foto
  };

  this.perfilService.guardarPerfil(perfil);
  this.router.navigate(['/home']);
}
}
