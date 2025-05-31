import { where } from "sequelize";
import { Turno } from "../models";
import { Panaderia } from "../models/panaderia";
import { Request,Response } from "express";

export const crearPanaderia = async (req:Request, res:Response) => {
  const { nombre,userId } = req.body;

  try {
    // Validar que el nombre esté presente
    if (!nombre || !userId) {
      return res.status(400).json({ error: 'Faltan datos necesarios' });
    }

    // Crear la panadería
    const nuevaPanaderia = await Panaderia.create({ nombre:nombre,userId:userId });

    // Responder con la panadería creada
    res.status(201).json(nuevaPanaderia);
  } catch (error) {
    res.status(500).json({ msg:'Error al crear panaderia' });
  }
};

export const getPanaderia = async(req:Request,res:Response)=>{
    const { id } = req.params;

    const panaderiaConDetalles = await Panaderia.findOne({where:{userId:id}});
if (!panaderiaConDetalles) {
  return res.status(404).json({ msg: "Panaderia no encontrada" });
}
return res.json(panaderiaConDetalles);

}
