import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroments';
import { Observable } from 'rxjs';
import { Panaderia } from '../interfaces/panaderia';
import { ToastrService } from 'ngx-toastr';
import { Turno } from '../interfaces/turno';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {
 private myAppUrl: string;
  private myApiUrl: string;
  constructor(private http: HttpClient,private toastr:ToastrService) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'SGIndPan/turno/';
   }
   getTurnos(id:number){
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${id}`);
   }
   craerTurno(turno:Turno){
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`,turno);
   }

   getTurnoDetalle(id?:number){
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}detalles/${id}`);
   }

   eliminarTurno(id:number){ 
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}${id}`).subscribe({
    next: () => {
      this.toastr.success('Turno eliminado correctamente','Info');
      // Actualiza la lista de productos o haz alguna acción
    },
    error: (err) => {
      this.toastr.error('Error al eliminar','Error');
    }
  });
   }
}

