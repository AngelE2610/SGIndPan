// controllers/cargo-controller.ts
import { Request, Response } from "express";
import { Cargo } from "../models/cargo";

export const crearCargo = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({ msg: "El nombre del cargo es obligatorio" });
    }

    const nuevoCargo = await Cargo.create({ nombre });

    return res.status(201).json({
      msg: "Cargo creado exitosamente",
      cargo: nuevoCargo,
    });
  } catch (error) {
    console.error("Error al crear cargo:", error);
    return res.status(500).json({
      msg: "Error interno al crear cargo",
      error: (error as Error).message,
    });
  }
};

export const deleteCargo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const resultado = await Cargo.destroy({ where: { id } })
    if (resultado === 0) {
      return res.status(404).json({ message: 'Cargo no encontrado' });
    }

    res.status(200).json({ message: 'Cargo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el Cargo' });
  }

}

export const getAllCargo = async (req: Request, res: Response) => {

  const cargoConDetalles = await Cargo.findAll();
  return res.json(cargoConDetalles);

}