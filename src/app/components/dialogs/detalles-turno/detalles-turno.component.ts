import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Turno } from '../../../interfaces/turno';
import { Product } from '../../../interfaces/product';
import { Cargo, Trabajador } from '../../../interfaces/trabajador';
import { CommonModule, NgFor } from '@angular/common';
import { TrabajadorService } from '../../../services/trabajador.service';

@Component({
  selector: 'app-detalles-turno',
  imports: [MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  MatDialogModule,NgFor,CommonModule],
  templateUrl: './detalles-turno.component.html',
  styleUrl: './detalles-turno.component.css'
})
export class DetallesTurnoComponent implements OnInit{
  Turno:Turno={
    numero: 0,
    Productos: [],
    trabajadores: []
  }
  opciones:Cargo[]=[];
  productos:any[]=[];
  trabajadores:Trabajador[]=[];
  constructor(
    public dialogRef: MatDialogRef<DetallesTurnoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private trabajador:TrabajadorService
  ) {
    
  }
  ngOnInit(): void {
    this.trabajador.getCargos().subscribe((respuesta:any)=>{
      this.opciones=respuesta;
    })
    if(this.data){
      this.Turno.numero=this.data.numero;
      this.Turno.fecha=this.data.fecha;
      this.productos=this.data.Productos;
      this.trabajadores=this.data.trabajadores;
    }
  }
  getNombreCargo(cargoId: number): string {
  const cargo = this.opciones.find(c => c.id === cargoId);
  return cargo ? cargo.nombre : 'N/A';
}
  cancelar(): void {
    this.dialogRef.close();
  }
  
  aceptar():void{
    this.dialogRef.close();
  }
}
