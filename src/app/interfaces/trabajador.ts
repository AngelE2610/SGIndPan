export interface Trabajador {
    id?:number,
    nombre:string,
    salario:number,
    cargoId:number,
    numeroTurno:number,
    panaderiaId:number,
    Cargo?:any,
    Turno?:any
}
export interface Cargo{
    id?:number,
    nombre:string
}
