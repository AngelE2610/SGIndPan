import { Request, Response } from "express";
import {Turno,Producto,Trabajador, TurnoProducto, TipoPan} from "../models/index"

export const crearTurno = async (req:Request, res:Response) => {
  const { numero, panaderiaId, productos } = req.body; // productos = [{ productoId, cantidadUsada }]
  
  try {
    const turno:any = await Turno.create({ numero, panaderiaId });
    
    for (const { productoId, cantidadUsada } of productos) {
      // Asignar producto al turno
      await TurnoProducto.create({ turnoId: turno.id, productoId, cantidadUsada });
      
      // Restar cantidadUsada de las existencias
      const producto:any = await Producto.findByPk(productoId);
      producto.existencias -= cantidadUsada;
      await producto.save();
    }
    
    res.status(201).json(turno);
  } catch (error) {
    res.status(500).json({ msg:'Error al crear el turno'});
  }
};


export const getTurno = async(req:Request,res:Response)=>{
    const { id } = req.params;

    const turnoConDetalles = await Turno.findByPk(id, {
      include: [
        { model: Producto, through: { attributes: ['cantidadUsada']}},
        { model: Trabajador },
      ]
    });
if (!turnoConDetalles) {
  return res.status(404).json({ msg: "Turno perdido" });
}
return res.json(turnoConDetalles);

}
