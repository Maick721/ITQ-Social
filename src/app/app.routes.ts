import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { MuroComponent } from './usuario/muro/muro.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { PaneladminComponent } from './administrador/paneladmin/paneladmin.component';

export const routes: Routes = [
  // ===== RUTAS DE AUTENTICACIÓN =====
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent }, 
  { path: 'forgot-password', component: ForgotPasswordComponent }, 
  { path: 'muro', component: MuroComponent },
  { path: 'home', component: HomeComponent },
  {path: 'navbar', component: NavbarComponent},
  {path: 'paneladmin', component: PaneladminComponent},
  {path: 'common', component: CommonModule},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];