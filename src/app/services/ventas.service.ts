import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../enviroments/enviroments";

@Injectable({
  providedIn: 'root'
})
export class VentasService {
 private myAppUrl: string;
  private myApiUrl: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'SGIndPan/ventas/';
   }
   getVentasPanaderia(id:number){
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${id}`);
   }
   getVentasTurno(panaderiaId:number,id:number){
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${panaderiaId}/${id}`);
   }
}