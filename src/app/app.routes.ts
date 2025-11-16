import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { MuroComponent } from './components/muro/muro.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { PaneladminComponent } from './components/paneladmin/paneladmin.component';
import { CommonModule } from '@angular/common';

export const routes: Routes = [
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