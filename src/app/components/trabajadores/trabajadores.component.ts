import { Component } from '@angular/core';
import { TrabajadorService } from '../../services/trabajador.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Trabajador } from '../../interfaces/trabajador';
import { NgFor } from '@angular/common';
import { AddTrabajadorComponent } from '../dialogs/add-trabajador/add-trabajador.component';
import { ButtonsComponent } from "../../shared/buttons/buttons.component";
import { EncabezadoComponent } from "../../shared/encabezado/encabezado.component";
import { TablaFiltrarComponent } from '../../shared/tabla-filtrar/tabla-filtrar.component';

@Component({
  selector: 'app-trabajadores',
  imports: [TablaFiltrarComponent],
  templateUrl: './trabajadores.component.html',
  styleUrl: './trabajadores.component.css'
})
export class TrabajadoresComponent {

  datos: Trabajador[] = [];

  constructor(private trabajador: TrabajadorService, private toastr: ToastrService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.refresh()
  }

  getTrabajador(id: number) {
    this.trabajador.getTrabajadores(id).subscribe((data: any) => {
      this.datos = data;
    });
  }
  openDialogAdd(trabajador?: Trabajador) {
    const data = (!trabajador) ? {
      width: '350px',
    } : {
      width: '350px',
      data: trabajador
    }
    const dialogRef = this.dialog.open(AddTrabajadorComponent, data);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (trabajador) {
          this.trabajador.actualizarTrabajador(result);
          setTimeout(() => this.refresh(), 1000);
        } else {
          this.trabajador.crearTrabajador(result)
            .subscribe({
              next: () => {
                this.toastr.success('Trabajador agregado correctamente');
                this.refresh()
              },
              error: (err) => {
                this.toastr.error(err.error.msg);
              }
            });
        }
      }
    });
  }
  deleteTrabajador(trabajador: any) {
    this.trabajador.eliminarTrabajador(trabajador.id);
    this.refresh()
  }
  refresh() {
    const panaderiaId = localStorage.getItem('panaderiaId');
    if (panaderiaId) {
      this.datos = [];
      this.getTrabajador(parseInt(panaderiaId));
    }
  }
}
