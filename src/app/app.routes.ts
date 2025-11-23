import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component'; 
import { PaneladminComponent } from './administrador/paneladmin/paneladmin.component';
import { LoginComponent } from './auth/login/login.component';
import { MuroComponent } from './usuario/muro/muro.component'; 
import { RegistroComponent } from './auth/registro/registro.component'; 
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component'; 
import { MensajesComponent } from './usuario/mensajes/mensajes.component';
import { AmigosComponent } from './usuario/amigos/amigos.component';
import { GestionUsuariosComponent } from './administrador/gestion-usuarios/gestion-usuarios.component'; 
import { EstadisticasComponent } from './administrador/estadisticas/estadisticas.component'; 
import { NotificacionesAdminComponent } from './administrador/notificaciones/notificaciones.component';
import { PerfilComponent } from './usuario/perfil/perfil.component';
import { SubirContenidoComponent } from './usuario/subir-contenido/subir-contenido.component';
import { CompletarPerfilComponent } from './usuario/completar-perfil/completar-perfil.component';
import { AuthGuard } from './guards/auth.guard'; // Para proteger todas nuestras rutas

export const routes: Routes = [
  // ===== RUTAS DE AUTENTICACIÓN =====
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent }, 
  { path: 'forgot-password', component: ForgotPasswordComponent }, 
  
  // ===== RUTAS DE USUARIO (PROTEGIDAS) =====
  { path: 'muro', component: MuroComponent, canActivate: [AuthGuard] },
  { path: 'usuario/mensajes', component: MensajesComponent, canActivate: [AuthGuard] },
  { path: 'usuario/amigos', component: AmigosComponent, canActivate: [AuthGuard] },
  { path: 'usuario/perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: 'subir-contenido', component: SubirContenidoComponent, canActivate: [AuthGuard] },
{ path: 'completar-perfil', component: CompletarPerfilComponent, canActivate: [AuthGuard] },

  // ===== RUTAS DE ADMINISTRADOR (PROTEGIDAS) =====
  { path: 'paneladmin', component: PaneladminComponent, canActivate: [AuthGuard] },
  { path: 'admin/gestion-usuarios', component: GestionUsuariosComponent, canActivate: [AuthGuard] },
  { path: 'admin/estadisticas', component: EstadisticasComponent, canActivate: [AuthGuard] },
  { path: 'admin/notificaciones', component: NotificacionesAdminComponent, canActivate: [AuthGuard] },
  
  // ===== RUTAS PÚBLICAS =====
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }, 
  { path: 'navbar', component: NavbarComponent },
  
  // ===== RUTAS POR DEFECTO =====
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];