import { Component, Inject } from '@angular/core';
import { Venta } from '../../../interfaces/venta';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-venta',
  imports: [CommonModule,FormsModule,MatDialogModule,MatButtonModule],
  templateUrl: './add-venta.component.html',
  styleUrl: './add-venta.component.css'
})
export class AddVentaComponent {
  panaderia = localStorage.getItem('panaderiaId');
  venta: Venta = {
    cantidad: 0,
    numeroTurno: 0,
    panaderiaId: parseInt(this.panaderia?this.panaderia:'0')
  };

  constructor(
    public dialogRef: MatDialogRef<AddVentaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  cancelar(): void {
    this.dialogRef.close();
  }
  
  aceptar():void{
    this.dialogRef.close(this.venta);
  }
}
