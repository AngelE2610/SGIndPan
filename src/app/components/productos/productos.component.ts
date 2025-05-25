import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ExistenciaComponent } from '../dialogs/existencia/existencia.component';
import { MatButtonModule } from '@angular/material/button';
import { AddProductoComponent } from '../dialogs/add-producto/add-producto.component';
import { ButtonsComponent } from "../../shared/buttons/buttons.component";
import { EncabezadoComponent } from "../../shared/encabezado/encabezado.component";
// Importa Modal de Bootstrap si usas el JS de Bootstrap
declare var bootstrap: any;

@Component({
  selector: 'app-productos',
  imports: [NgFor, FormsModule, CommonModule, MatButtonModule, ButtonsComponent, EncabezadoComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  @ViewChild('modal') modal!: ElementRef;
  datos: Product[] = [];
  cantidadAAgregar: number = 1;
  productoSeleccionado: any = null;
  modalInstance: any;
  pageSize = 6;
currentPage = 0;

  constructor(private productos: ProductsService, private toastr: ToastrService,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.refresh()
  }

  getProductos(id: number) {
    this.productos.getProducts(id).subscribe((data: any) => {
      this.datos = data;
    });
  }
  openDialog(producto: any) {
    const dialogRef = this.dialog.open(ExistenciaComponent, {
      width: '350px',
      data: { producto: producto }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.productos.aumentarExistencias(producto.id, result)
          .subscribe({
            next: () => {
              this.toastr.success('Existencias actualizadas correctamente');
              this.refresh()
            },
            error: (err) => {
              this.toastr.error('Error al actualizar existencias');
            }
          });
    });
  }
  openDialogAdd() {
    const dialogRef = this.dialog.open(AddProductoComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.productos.crearProducto(result)
          .subscribe({
            next: () => {
              this.toastr.success('Producto creado correctamente');
             this.refresh()
            },
            error: (err) => {
              this.toastr.error('Error al crear el producto');
            }
          });
    });
  }
  deleteProd(producto:any){
    console.log('entrando al delete')
    this.productos.eliminarProd(producto.id);
    this.refresh()
  }
  refresh(){
    const panaderiaId = localStorage.getItem('panaderiaId');
    if (panaderiaId) {
      this.datos =[];
      this.getProductos(parseInt(panaderiaId));
    }
  }
  get paginatedData() {
  const start = this.currentPage * this.pageSize;
  const end = start + this.pageSize;
  return this.datos.slice(start, end);
}

nextPage() {
  if ((this.currentPage + 1) * this.pageSize < this.datos.length) {
    this.currentPage++;
  }
}

prevPage() {
  if (this.currentPage > 0) {
    this.currentPage--;
  }
}
}
