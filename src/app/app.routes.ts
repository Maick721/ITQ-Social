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



export const routes: Routes = [
  // ===== RUTAS DE AUTENTICACIÓN =====
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent }, 
  { path: 'forgot-password', component: ForgotPasswordComponent }, 
  
  // ===== RUTAS DE USUARIO =====
  { path: 'muro', component: MuroComponent },
  { path: 'usuario/mensajes', component: MensajesComponent },
  { path: 'usuario/amigos', component: AmigosComponent },
  { path: 'usuario/perfil', component: PerfilComponent },
  { path: 'subir-contenido', component: SubirContenidoComponent },
  
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