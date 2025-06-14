import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductosComponent } from './components/productos/productos.component';
import { TrabajadoresComponent } from './components/trabajadores/trabajadores.component';
import { authGuard } from './util/auth.guard';
import { TurnosComponent } from './components/turnos/turnos.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { HomeComponent } from './components/home/home.component';
import { InicialComponent } from './components/inicial/inicial.component';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',component: LoginComponent},
    {path:'signIn',component: SignInComponent},
    {path:'inicio',component: InicialComponent},
    {path:'dashboard',component: DashboardComponent,canActivate:[authGuard],children:[
        {path:'productos',component:ProductosComponent},
        {path:'trabajadores',component:TrabajadoresComponent},
        {path:'turnos',component:TurnosComponent},
        {path:'ventas',component:VentasComponent},
        {path:'home',component:HomeComponent}
    ]},
    {path:'**',redirectTo:'login',pathMatch:'full'}
];
