// controllers/trabajador-controller.ts
import { Request, Response } from "express";
import { Trabajador } from "../models/trabajador";
import { Cargo } from "../models/cargo";
import { Turno } from "../models/turno";

export const crearTrabajador = async (req: Request, res: Response) => {
  try {
    const { nombre, salario, cargoId, numeroTurno,panaderiaId} = req.body;

    if (!nombre || salario == null || !cargoId || !numeroTurno) {
      return res.status(400).json({ msg: "Faltan datos obligatorios (nombre, salario, cargoId)" });
    }

    // Validar que el cargo exista
    const cargo = await Cargo.findByPk(cargoId);
    if (!cargo) {
      return res.status(404).json({ msg: "Cargo no encontrado" });
    }
    const turno = await Turno.findOne({where:{numero:numeroTurno}});
    if (!turno) {
      return res.status(404).json({ msg: "Turno no encontrado" });
    }
    

    const nuevoTrabajador = await Trabajador.create({
      nombre,
      salario,
      cargoId,
      numeroTurno: numeroTurno,
      panaderiaId:panaderiaId
    });

    return res.status(201).json({
      msg: "Trabajador creado exitosamente",
      trabajador: nuevoTrabajador,
    });
  } catch (error) {
    console.error("Error al crear trabajador:", error);
    return res.status(500).json({
      msg: "Error interno al crear trabajador",
      error: (error as Error).message,
    });
  }
};

export const updateTrabajador= async (req:Request,res:Response) =>{
  const {id} = req.params;
  const{salario, cargoId, numeroTurno} = req.body;
try {
   const trabajador = await Trabajador.findByPk(id);

  if(!trabajador){
    return res.status(404).json({ message: 'Trabajador no encontrado' });
  }

  await trabajador.update({salario:salario,cargoId:cargoId,numeroTurno:numeroTurno});
  res.status(200).json(trabajador);

} catch (error) {
   res.status(500).json({msg:'Error al actualizar trabajador'})
}
 
}


export const getTrabajadorPanaderia = async(req:Request,res:Response)=>{
    const { id } = req.params;

    const trabajadorConDetalles = await Trabajador.findAll({where:{panaderiaId:id}, include:[
      {model:Cargo},
    ]});
if (!trabajadorConDetalles) {
  return res.status(404).json({ msg: "Trabajador no encontrado" });
}
return res.json(trabajadorConDetalles);
}

export const deleteTrabajador = async(req:Request,res:Response)=>{
    const { id } = req.params;
     try {
      const resultado = await Trabajador.destroy({where:{id}})
      if (resultado === 0) {
      return res.status(404).json({ message: 'Trabajador no encontrado' });
    }

    res.status(200).json({ message: 'Trabajador eliminado correctamente' });
     } catch (error) {
       res.status(500).json({ message: 'Error al eliminar el Trabajador' });
     }

}