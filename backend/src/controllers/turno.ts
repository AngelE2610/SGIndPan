import { Request, Response } from "express";
import {Turno,Producto,Trabajador, TurnoProducto, TipoPan} from "../models/index"

export const crearTurno = async (req:Request, res:Response) => {
  const { numero, panaderiaId, Productos,fecha } = req.body; // productos = [{ productoId, cantidadUsada }]
  
  try {
    const turno:any = await Turno.create({ numero, panaderiaId,fecha });
    
    for (const { productoId, cantidadUsada } of Productos) {
      // Asignar producto al turno
      await TurnoProducto.create({ turnoId: turno.id, productoId, cantidadUsada });
      
      // Restar cantidadUsada de las existencias
      const producto:any = await Producto.findByPk(productoId);
      producto.existencias -= cantidadUsada;
      await producto.save();
    }
    
    res.status(201).json(turno);
  } catch (error) {
    res.status(500).json({ msg:'Error al crear el turno',error});
  }
};


export const getTurno = async(req:Request,res:Response)=>{
    const { id } = req.params;

    const turno:any = await Turno.findByPk(id, {
      include: [
        { model: Producto, through: { attributes: ['cantidadUsada']}},
      ]
    });
if (!turno) {
  return res.status(404).json({ msg: "Turno perdido" });
}
const trabajadores = await Trabajador.findAll({
    where: { numeroTurno: turno.numero,panaderiaId:turno.panaderiaId }
  });

  return res.json({
    ...turno.toJSON(),
    trabajadores
  });

}

export const getAllTurno = async(req:Request,res:Response)=>{
    const { id } = req.params;

    const turno:any = await Turno.findAll({where:{panaderiaId:id}
    });
if (!turno) {
  return res.status(404).json({ msg: "Turno perdido" });
}
 const turnosConTrabajadores = await Promise.all(
    turno.map(async (turno:any) => {
      const trabajadores = await Trabajador.findAll({
        where: { numeroTurno: turno.numero,panaderiaId:id }
      });
      return {
        ...turno.toJSON(),
        trabajadores
      };
    })
  );

  return res.json(turnosConTrabajadores);

}

export const deleteTurno = async(req:Request,res:Response)=>{
    const { id } = req.params;
     try {
      const resultado = await Turno.destroy({where:{id}})
      if (resultado === 0) {
      return res.status(404).json({ message: 'Turno no encontrado' });
    }

    res.status(200).json({ message: 'Turno eliminado correctamente' });
     } catch (error) {
       res.status(500).json({ message: 'Error al eliminar el Turno' });
     }

}