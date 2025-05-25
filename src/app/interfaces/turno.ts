import { Product } from "./product";
import { Trabajador } from "./trabajador";

export interface Turno {
    id?:number,
    numero:number,
    fecha?:string,
    Productos:any[],
    trabajadores:Trabajador[],
    panaderiaId?:number
}
export interface TurnoCreacion {
    numero: number;
    Productos: any[];
    // trabajadores es opcional
    trabajadores?: Trabajador[];
    // Otros campos opcionales
    fecha?: string;
    panaderiaId?: number;
}
