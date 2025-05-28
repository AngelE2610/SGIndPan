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
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-turnos',
  imports: [EncabezadoComponent, NgFor, ButtonsComponent,CommonModule,FormsModule],
  templateUrl: './turnos.component.html',
  styleUrl: './turnos.component.css'
})
export class TurnosComponent {
      datos: Turno[] = [];
      datosFiltrados: Turno[] = [];
filtroTurno: string = 'all';
numerosTurnos: string[] = [];

paginaActual: number = 1;
  elementosPorPagina: number = 5;
  totalElementos: number = 0;
  totalPaginas: number = 0;

  constructor(private turno:TurnoService, private toastr: ToastrService,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.refresh()
  }

  getTurno(id: number) {
    this.turno.getTurnos(id).subscribe((data: any) => {
      this.datos = data;
      this.datosFiltrados = [...this.datos];
      this.numerosTurnos = Array.from(new Set(data.map((t: any) => t.numero.toString())));
      this.totalElementos = this.datosFiltrados.length;
    this.totalPaginas = Math.ceil(this.totalElementos / this.elementosPorPagina);
    });
  }
  filtrarTurnos() {
  if (this.filtroTurno === 'all') {
    this.datosFiltrados = [...this.datos];
  } else {
    this.datosFiltrados = this.datos.filter(t => t.numero.toString() === this.filtroTurno);
  }
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
        if(result){
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
        }
      });
    }
    get elementosPagina(): any[] {
  const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
  const fin = inicio + this.elementosPorPagina;
  return this.datosFiltrados.slice(inicio, fin);
}
  paginaAnterior(): void {
  if (this.paginaActual > 1) {
    this.paginaActual--;
  }
}

paginaSiguiente(): void {
  if (this.paginaActual < this.totalPaginas) {
    this.paginaActual++;
  }
}

irAPagina(pagina: number): void {
  this.paginaActual = pagina;
}

getRangoPaginas(): number[] {
  const paginas: number[] = [];
  const inicio = Math.max(1, this.paginaActual - 2);
  const fin = Math.min(this.totalPaginas, this.paginaActual + 2);
  for (let i = inicio; i <= fin; i++) {
    paginas.push(i);
  }
  return paginas;
}
}
