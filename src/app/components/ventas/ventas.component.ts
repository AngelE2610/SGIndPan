import { Component, OnInit } from '@angular/core';
import { TablaFiltrarComponent } from '../../shared/tabla-filtrar/tabla-filtrar.component';
import { Venta } from '../../interfaces/venta';
import { VentasService } from '../../services/ventas.service';

@Component({
  selector: 'app-ventas',
  imports: [TablaFiltrarComponent],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent implements OnInit{
  
  datos: Venta[]=[];

  constructor(private ventaService:VentasService){

  }
  ngOnInit(): void {
    this.refresh();
  }

  getVenta(id: number) {
    this.ventaService.getVentasPanaderia(id).subscribe((data: any) => {
      this.datos = data;
    });
  }
  refresh(){
    const panaderiaId = localStorage.getItem('panaderiaId');
    if (panaderiaId) {
      this.datos =[];
      this.getVenta(parseInt(panaderiaId));
    }
  }
}
