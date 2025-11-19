import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component'; // ← "shared" no "shareId"
import { PaneladminComponent } from './administrador/paneladmin/paneladmin.component';
import { LoginComponent } from './auth/login/login.component';
import { MuroComponent } from './usuario/muro/muro.component'; // ← "muro" no "maro"
import { RegistroComponent } from './auth/registro/registro.component'; // ← "registro" no "registero"
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component'; // ← "forgot-password" no "forger_password"
import { InicioComponent } from './usuario/inicio/inicio.component'; // ← "Inicio" no "Indic"
import { NotificacionesComponent } from './usuario/notificaciones/notificaciones.component'; // ← "Notificaciones" no "Notifications"
import { MensajesComponent } from './usuario/mensajes/mensajes.component'; // ← "Mensajes" no "Menegis"
import { AmigosComponent } from './usuario/amigos/amigos.component';
import { GestionUsuariosComponent } from './administrador/gestion-usuarios/gestion-usuarios.component'; // ← "GestionUsuarios" no "GastroUsuario"
import { EstadisticasComponent } from './administrador/estadisticas/estadisticas.component'; // ← "Estadisticas" no "Estadistics"
import { NotificacionesAdminComponent } from './administrador/notificaciones/notificaciones.component';

export const routes: Routes = [
  // ===== RUTAS DE AUTENTICACIÓN =====
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent }, 
  { path: 'forgot-password', component: ForgotPasswordComponent }, 
  
  // ===== RUTAS DE USUARIO =====
  { path: 'muro', component: MuroComponent },
  { path: 'usuario/inicio', component: InicioComponent },
  { path: 'usuario/notificaciones', component: NotificacionesComponent },
  { path: 'usuario/mensajes', component: MensajesComponent },
  { path: 'usuario/amigos', component: AmigosComponent },
  
  // ===== RUTAS DE ADMINISTRADOR =====
  { path: 'paneladmin', component: PaneladminComponent },
  { path: 'admin/gestion-usuarios', component: GestionUsuariosComponent },
  { path: 'admin/estadisticas', component: EstadisticasComponent },
  { path: 'admin/notificaciones', component: NotificacionesAdminComponent },
  
  // ===== RUTAS PÚBLICAS =====
  { path: 'home', component: HomeComponent },
  { path: 'navbar', component: NavbarComponent },
  
  // ===== RUTAS POR DEFECTO =====
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];