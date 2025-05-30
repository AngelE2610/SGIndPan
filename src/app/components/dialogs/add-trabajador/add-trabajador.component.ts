import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Cargo, Trabajador } from '../../../interfaces/trabajador';
import { TrabajadorService } from '../../../services/trabajador.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-trabajador',
  standalone:true,
  imports: [MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  MatDialogModule,
NgFor,NgIf],
  templateUrl: './add-trabajador.component.html',
  styleUrl: './add-trabajador.component.css'
})
export class AddTrabajadorComponent implements OnInit{
panaderia = localStorage.getItem('panaderiaId');
  Trabajador: Trabajador = {
    nombre: '',
    salario: 0,
    cargoId: 0,
    numeroTurno: 0,
    panaderiaId: parseInt(this.panaderia?this.panaderia:'0')
  };
  opciones:Cargo[]=[];
  constructor(
    public dialogRef: MatDialogRef<AddTrabajadorComponent>,
    private trabajador:TrabajadorService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    
  }

  ngOnInit(): void {
    // Ejemplo: llamar a un método del servicio y asignar la respuesta a opciones
    this.trabajador.getCargos().subscribe((respuesta:any)=>{
      this.opciones=respuesta;
    })

    if(this.data){
      this.Trabajador.id=this.data.id;
      this.Trabajador.nombre=this.data.nombre;
      this.Trabajador.numeroTurno=this.data.Turno?.numero;
      this.Trabajador.cargoId=this.data.cargoId;
      this.Trabajador.salario=this.data.salario;
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
  
  aceptar():void{
    this.dialogRef.close(this.Trabajador);
  }
}
