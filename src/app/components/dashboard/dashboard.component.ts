import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductsService } from '../../services/products.service';
import { NgFor } from '@angular/common';
import { Product } from '../../interfaces/product';
import { ListProd } from '../../interfaces/list-prod';

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent,NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  datos:any;

  constructor(private _productService: ProductsService){

  }
  ngOnInit():void{
    this.getProducts();
    console.log(this.datos)
  }

  getProducts(){
    this._productService.getProducts().subscribe(data=>{
      this.datos=data;
      console.log(data);
    })
  }
}
