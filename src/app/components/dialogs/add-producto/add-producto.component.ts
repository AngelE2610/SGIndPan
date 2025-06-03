import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../interfaces/product';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-producto',
  imports: [MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule, NgIf],
  templateUrl: './add-producto.component.html',
  styleUrl: './add-producto.component.css'
})
export class AddProductoComponent {
  panaderia = localStorage.getItem('panaderiaId');
  producto: Product = {
    nombre: '',
    existencias: 0,
    fechaAdquisicion: new Date().toISOString().substring(0, 10),
    panaderiaId: parseInt(this.panaderia ? this.panaderia : '0')
  };

  constructor(
    public dialogRef: MatDialogRef<AddProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  cancelar(): void {
    this.dialogRef.close();
  }

  aceptar(): void {
    this.dialogRef.close(this.producto);
  }

}
