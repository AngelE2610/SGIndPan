import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-encabezado',
  imports: [],
  templateUrl: './encabezado.component.html',
  styleUrl: './encabezado.component.css'
})
export class EncabezadoComponent {
  @Input() titulo:string='';
  @Output() funcion = new EventEmitter<void>();

  onfuncion():void{
    this.funcion.emit();
  }

}
