import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroments';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
 private myAppUrl: string;
  private myApiUrl: string;
  constructor(private http: HttpClient,private toastr:ToastrService) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'SGIndPan/productos';
   }
   getProducts(id:number): Observable<Product[]>{
    // const token = localStorage.getItem('token');
    // const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    //return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}`,{headers:headers});
    return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
   }

   aumentarExistencias(id:number,existencias:number){
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}/${id}`,{ existencias:existencias});
   }
   crearProducto(producto:Product){
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`,producto);
   }
   eliminarProd(id:number){ 
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/${id}`).subscribe({
    next: () => {
      this.toastr.success('Producto eliminado correctamente','Info');
      // Actualiza la lista de productos o haz alguna acción
    },
    error: (err) => {
      this.toastr.error('Error al eliminar','Error');
    }
  });
   }
}
