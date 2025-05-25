import { Component } from '@angular/core';
import { Turno } from '../../interfaces/turno';
import { TurnoService } from '../../services/turno.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { EncabezadoComponent } from "../../shared/encabezado/encabezado.component";
import { Trabajador } from '../../interfaces/trabajador';
import { CommonModule, NgFor } from '@angular/common';
import { ButtonsComponent } from "../../shared/buttons/buttons.component";
import { DetallesTurnoComponent } from '../dialogs/detalles-turno/detalles-turno.component';
import { AddTurnoComponent } from '../dialogs/add-turno/add-turno.component';

@Component({
  selector: 'app-turnos',
  imports: [EncabezadoComponent, NgFor, ButtonsComponent,CommonModule],
  templateUrl: './turnos.component.html',
  styleUrl: './turnos.component.css'
})
export class TurnosComponent {
      datos: Turno[] = [];

  constructor(private turno:TurnoService, private toastr: ToastrService,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.refresh()
  }

  getTurno(id: number) {
    this.turno.getTurnos(id).subscribe((data: any) => {
      this.datos = data;
    });
  }
  getTrabajadorCargo3(trabajadores: any[]): any {
  return trabajadores?.find(t => t.cargoId === 3);
}
  openDialogDetalles(turno:Turno) {

     this.turno.getTurnoDetalle(turno.id).subscribe(
  (respuesta) => {
    const dialogRef = this.dialog.open(DetallesTurnoComponent, {
      width: '600px',
      data: respuesta // Aquí pasas la respuesta como data
    });
  },
  (error) => {
    console.error('Error:', error);
  }
);
    
   }
   deleteTurno(turno:any){
     this.turno.eliminarTurno(turno.id);
     this.refresh()
   }
  refresh(){
    const panaderiaId = localStorage.getItem('panaderiaId');
    if (panaderiaId) {
      this.datos =[];
      this.getTurno(parseInt(panaderiaId));
    }
  }
  openDialogAdd() {
      const dialogRef = this.dialog.open(AddTurnoComponent, {
        width: '500px',
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.turno.craerTurno(result)
            .subscribe({
              next: () => {
                this.toastr.success('Turno creado correctamente');
               this.refresh()
              },
              error: (err) => {
                this.toastr.error('Error al crear el turno');
              }
            });
      });
    }
}
