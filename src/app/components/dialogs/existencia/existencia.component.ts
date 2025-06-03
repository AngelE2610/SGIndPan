import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-existencia',
  imports: [MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule, NgIf],
  templateUrl: './existencia.component.html',
  styleUrl: './existencia.component.css'
})
export class ExistenciaComponent {
  cantidadAAgregar: number = 0;

  constructor(
    public dialogRef: MatDialogRef<ExistenciaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productos: ProductsService,
    private toastr: ToastrService
  ) { }

  cancelar(): void {
    this.dialogRef.close();
  }

  aceptar(): void {

    this.dialogRef.close(this.cantidadAAgregar);
  }
}
