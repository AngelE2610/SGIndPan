import { Request, Response } from "express";
import { Producto } from "../models";

export const crearProducto = async (req: Request, res: Response) => {
  try {
    const { nombre, existencias, fechaAdquisicion ,panaderiaId} = req.body;

    // Validar campos obligatorios
    if (!nombre || existencias == null || !fechaAdquisicion) {
      return res.status(400).json({ msg: "Faltan datos obligatorios" });
    }
    const fecha = new Date(fechaAdquisicion);
    // Crear producto en la base de datos
    const nuevoProducto = await Producto.create({
      nombre,
      existencias,
      fechaAdquisicion:fecha,
      panaderiaId
    });

    return res.status(201).json({
      msg: "Producto creado exitosamente",
      producto: nuevoProducto
    });
  } catch (error) {
    console.error("Error al crear producto:", error);
    return res.status(500).json({
      msg: "Error interno al crear producto",
    });
  }
};

export const updateProducto = async(req:Request,res:Response)=>{
    const {existencias} = req.body;
    const { id } = req.params;
    
    try {
      const producto:any = await Producto.findByPk(id);
      if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    const nuevasExistencias = producto.existencias + Number(existencias);
    await producto.update({
      existencias: nuevasExistencias,
    });
    res.status(200).json(producto);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el producto' });
    }
}

export const getProductoPanaderia = async(req:Request,res:Response)=>{
    const { id } = req.params;

    const productoConDetalles = await Producto.findAll({where:{panaderiaId:id}});
if (!productoConDetalles) {
  return res.status(404).json({ msg: "Producto no encontrado" });
}
return res.json(productoConDetalles);
}


export const getAllProducto = async(req:Request,res:Response)=>{

    const productoConDetalles = await Producto.findAll();
return res.json(productoConDetalles);

}

export const deleteProducto = async(req:Request,res:Response)=>{
    const { id } = req.params;
     try {
      const resultado = await Producto.destroy({where:{id}})
      if (resultado === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.status(200).json({ message: 'Producto eliminado correctamente' });
     } catch (error) {
       res.status(500).json({ message: 'Error al eliminar el producto' });
     }

}
