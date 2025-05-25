// controllers/trabajador-controller.ts
import { Request, Response } from "express";
import { Turno } from "../models/turno";
import { TipoPan } from "../models";

export const crearTipoPan = async (req: Request, res: Response) => {
  try {
    const { nombre, turnoId , cantidad } = req.body;

    if (!nombre || !turnoId) {
      return res.status(400).json({ msg: "Faltan datos obligatorios" });
    }

    // Validar que el turno exista (opcional)
    if (turnoId) {
      const turno = await Turno.findByPk(turnoId);
      if (!turno) {
        return res.status(404).json({ msg: "Turno no encontrado" });
      }
    }

    const nuevoPan = await TipoPan.create({
      nombre,
      cantidad:cantidad,
      turnoId: turnoId,
    });

    return res.status(201).json({
      msg:"Nuevo pan  creado exitosamente",
      TipoPan: nuevoPan,
    });
  } catch (error) {
    console.error("Error al crear pan:", error);
    return res.status(500).json({
      msg: "Error interno al crear pan",
      error: (error as Error).message,
    });
  }
};