import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroments';
import { Trabajador } from '../interfaces/trabajador';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TrabajadorService {
private myAppUrl: string;
  private myApiUrl: string;
  constructor(private http: HttpClient,private toastr:ToastrService) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'SGIndPan/trabajador/';
   }
   getCargos(){
    return this.http.get(`${this.myAppUrl}SGIndPan/cargo`);
   }
   getTrabajadores(id:number){
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${id}`);
   }
   crearTrabajador(trabajador:Trabajador){
       return this.http.post(`${this.myAppUrl}${this.myApiUrl}`,trabajador);
      }
      eliminarTrabajador(id:number){ 
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}${id}`).subscribe({
    next: () => {
      this.toastr.success('Trabajador eliminado correctamente','Info');
      // Actualiza la lista de productos o haz alguna acción
    },
    error: (err) => {
      this.toastr.error('Error al eliminar','Error');
    }
  });
   }

   actualizarTrabajador(trabajador:Trabajador){
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}${trabajador.id}`,trabajador).subscribe({
    next: () => {
      this.toastr.success('Trabajador actualizado correctamente','Info');
      // Actualiza la lista de productos o haz alguna acción
    },
    error: (err) => {
      this.toastr.error('Error al actualizar','Error');
    }
  });
   }
}
