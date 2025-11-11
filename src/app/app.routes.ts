import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';

export const routes: Routes = [
    {path: "home", component: HomeComponent},
    {path: "navbar", component: NavbarComponent}
];
