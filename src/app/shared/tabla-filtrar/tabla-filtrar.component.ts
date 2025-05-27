import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tabla-filtrar',
  imports: [NgFor,FormsModule,CommonModule,NgIf],
  templateUrl: './tabla-filtrar.component.html',
  styleUrl: './tabla-filtrar.component.css'
})
export class TablaFiltrarComponent {
  @Input() datos: any[] = [];
  @Input() opciones: boolean = false;
  @Input() columnas: { titulo: string, propiedad: string }[] = [];
  @Input() propiedadFiltro: string = 'numero'; // Por defecto, pero puedes cambiarlo
  @Input() tituloTabla: string = '';
  @Input() tituloButton: string = '';
  @Input() filtrado: string = '';
  @Output() onDetalles = new EventEmitter<any>();
  @Output() onEliminar = new EventEmitter<any>();
  @Output() onFuncion = new EventEmitter<any>();

  datosFiltrados: any[] = [];
  filtro: string = 'all';
  opcionesFiltro: string[] = [];

  //para nav
  paginaActual: number = 1;
  elementosPorPagina: number = 5;
  totalElementos: number = 0;
  totalPaginas: number = 0;


  ngOnInit(): void {
    this.refrescarFiltro();
  }

  ngOnChanges(): void {
    if (this.datos) {
      this.refrescarFiltro();
    }
  }

  refrescarFiltro(): void {
    this.datosFiltrados = [...this.datos];
    this.opcionesFiltro = [...new Set(this.datos.map(d => String(d[this.propiedadFiltro as keyof any])))];
    this.totalElementos = this.datosFiltrados.length;
    this.totalPaginas = Math.ceil(this.totalElementos / this.elementosPorPagina);
  }
  getValor(item: any, propiedad: string): any {
  return item[propiedad];
}

getValorAnidado(item: any, path: string): any {
  return path.split('.').reduce((o, p) => o && o[p], item);
}

  filtrar(): void {
    if (this.filtro === 'all') {
      this.datosFiltrados = [...this.datos];
    } else {
      this.datosFiltrados = this.datos.filter(d => String(d[this.propiedadFiltro as keyof any]) === this.filtro);
    }
  }
  //para nav
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
