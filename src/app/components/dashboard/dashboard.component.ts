import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductsService } from '../../services/products.service';
import { NgFor } from '@angular/common';
import { Product } from '../../interfaces/product';
import { ListProd } from '../../interfaces/list-prod';
import { PanaderiaService } from '../../services/panaderia.service';
import { Panaderia } from '../../interfaces/panaderia';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent,NgFor,RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  nombre:string ='';

  constructor(private panaderiaService: PanaderiaService){

  }
  ngOnInit():void{
    const token = localStorage.getItem('token');
    if(token){
      const userId = localStorage.getItem('userId');
    if(userId){
      this.getPanaderia(parseInt(userId));
    }
    }
  }

    getPanaderia(id:number){
      this.panaderiaService.getPanaderia(id).subscribe((data:any) => {
      this.nombre = data.nombre;
      localStorage.setItem('panaderiaId',data?.id);
    })
  }
}
