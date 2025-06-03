import { Component, OnInit } from '@angular/core';
import { TablaFiltrarComponent } from '../../shared/tabla-filtrar/tabla-filtrar.component';
import { Venta } from '../../interfaces/venta';
import { VentasService } from '../../services/ventas.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AddVentaComponent } from '../dialogs/add-venta/add-venta.component';

@Component({
  selector: 'app-ventas',
  imports: [TablaFiltrarComponent],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent implements OnInit {

  datos: Venta[] = [];

  constructor(private ventaService: VentasService, private toastr: ToastrService, public dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.refresh();
  }

  getVenta(id: number) {
    this.ventaService.getVentasPanaderia(id).subscribe((data: any) => {
      this.datos = data;
    });
  }
  refresh() {
    const panaderiaId = localStorage.getItem('panaderiaId');
    if (panaderiaId) {
      this.datos = [];
      this.getVenta(parseInt(panaderiaId));
    }
  }
  openDialogAdd() {
    const dialogRef = this.dialog.open(AddVentaComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ventaService.crearVenta(result)
          .subscribe({
            next: () => {
              this.toastr.success('Venta creada correctamente');
              this.refresh()
            },
            error: (err) => {
              this.toastr.error(err.error.msg);
            }
          });
      }
    });
  }
}
