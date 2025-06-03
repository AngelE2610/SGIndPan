import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Turno, TurnoCreacion } from '../../../interfaces/turno';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-turno',
  imports: [MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule, NgFor, NgIf],
  templateUrl: './add-turno.component.html',
  styleUrl: './add-turno.component.css'
})
export class AddTurnoComponent implements OnInit {
  panaderia = localStorage.getItem('panaderiaId');
  turno: TurnoCreacion = {
    numero: 0,
    fecha: new Date().toISOString().substring(0, 10),
    panaderiaId: parseInt(this.panaderia ? this.panaderia : '0'),
    Productos: [],
  };
  opciones: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddTurnoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productos: ProductsService
  ) { }

  ngOnInit(): void {
    this.productos.getProducts(parseInt(this.panaderia ? this.panaderia : '0')).subscribe((respuesta) => {
      this.opciones = respuesta;
      console.log(this.opciones)
    })
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  aceptar(): void {
    this.dialogRef.close(this.turno);
  }
  // Método para manejar la selección de productos
  onProductosSeleccionados(event: any) {
    const selectedOptions = Array.from(event.target.selectedOptions).map((opt: any) => parseInt(opt.value));
    // Filtramos los productos que ya están seleccionados
    const nuevosProductos = selectedOptions
      .filter(id => !this.turno.Productos.some(ps => ps.productoId === id))
      .map(id => ({ productoId: id, cantidadUsada: 1 }));
    // Añadimos al array
    this.turno.Productos = [...this.turno.Productos, ...nuevosProductos];
  }

  // Método para eliminar un producto seleccionado
  eliminarProducto(index: number) {
    this.turno.Productos.splice(index, 1);
  }

  // Método para obtener el nombre del producto por ID
  getNombreProducto(id: number): string {
    const p = this.opciones.find(p => p.id === id);
    return p ? p.nombre + '(' + `${p.existencias}` + ')' : '';
  }

}
