import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroments';
import { Observable } from 'rxjs';
import { Panaderia } from '../interfaces/panaderia';

@Injectable({
  providedIn: 'root'
})
export class PanaderiaService {
 private myAppUrl: string;
  private myApiUrl: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'SGIndPan/panaderia/';
   }
   getPanaderia(id:number){
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${id}`);
   }
}
