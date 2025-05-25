import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-buttons',
  imports: [],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css'
})
export class ButtonsComponent {
  @Input() textoBoton: string = '';
  @Input() objeto: any;
  @Output() funcion = new EventEmitter<any>();
  @Output() eliminar = new EventEmitter<any>();

  onfuncion(): void {
    this.funcion.emit(this.objeto);
  }

  onEliminar(): void {
    this.eliminar.emit(this.objeto);
  }
}
