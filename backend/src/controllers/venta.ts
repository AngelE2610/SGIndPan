import { Response,Request } from "express";
import { Panaderia, Turno, Venta } from "../models";
import { Op } from "sequelize";



export const crearventa = async (req:Request,res:Response)=>{
    const {cantidad,fechaVenta,numeroTurno,panaderiaId} = req.body;

    try {
        if(!cantidad || !fechaVenta || !numeroTurno || !panaderiaId){
           return  res.status(400).json({
                msg:'Faltan datos necesarios '
            })
        }
        const panaderia = await Panaderia.findByPk(panaderiaId);
            if (!panaderia) {
              return res.status(404).json({ msg: "panaderia no encontrada" });
            }
        const turno = await Turno.findOne({where:{numero:numeroTurno}});
            if (!turno) {
              return res.status(404).json({ msg: "Turno no encontrado" });
            }
        const venta = await Venta.create({
            cantidad,
            fechaVenta,
            numeroTurno,
            panaderiaId
        })
        return  res.status(200).json({
                msg:'Venta creada correctamente ',
                venta:venta
            })
    } catch (error) {
        return res.status(500).json({ msg:'Error al crear la venta',error});
    }
}

export const getAllVenta = async (req:Request,res:Response)=>{
    const {id}= req.params;
    try {
        const panaderia = await Panaderia.findByPk(id);
            if (!panaderia) {
              return res.status(404).json({ msg: "panaderia no encontrada" });
            }
        const ventas = await Venta.findAll({where:{panaderiaId:id}});
        return res.json(ventas);
    } catch (error) {
        return res.status(500).json({ msg:'Error al bsucar ventas',error});
    }
}
export const getAllVentasTurno = async (req:Request,res:Response)=>{
    const {panaderiaId,id} = req.params;
    try {
        const panaderia = await Panaderia.findByPk(panaderiaId);
            if (!panaderia) {
              return res.status(404).json({ msg: "panaderia no encontrada" });
            }
        const turno = await Turno.findOne({where:{numero:id}});
            if (!turno) {
              return res.status(404).json({ msg: "Turno no encontrado" });
            }
        const ventas = await Venta.findAll({where:{panaderiaId:panaderiaId,numeroTurno:id}});
        return res.json(ventas);
    } catch (error) {
        return res.status(500).json({ msg:'Error al bsucar ventas',error});
    }
}
export const getVentasMes = async (req:Request,res:Response)=>{
    const {panaderiaId,mes} = req.params;
    try {
        // Validar que el mes sea válido (1-12)
        const mesNum = parseInt(mes, 10);
        if (mesNum < 1 || mesNum > 12) {
            return res.status(400).json({ msg: "Mes inválido. Debe ser entre 1 y 12" });
        }
        const panaderia = await Panaderia.findByPk(panaderiaId);
            if (!panaderia) {
              return res.status(404).json({ msg: "panaderia no encontrada" });
            }
            // Obtener el primer y último día del mes
        const year = new Date().getFullYear(); // O el año que quieras
        const startDate = new Date(year, mesNum - 1, 1);
        const endDate = new Date(year, mesNum, 0, 23, 59, 59, 999);
        // Consulta para filtrar ventas del mes y panadería
        const ventas:any = await Venta.findAll({
            where: {
                panaderiaId: panaderiaId,
                fechaVenta: {
                    [Op.gte]: startDate,
                    [Op.lt]: endDate
                }
            }
        });
         // Calcular suma de cantidad y cantidad de ventas
        const sumaCantidad = ventas.reduce((sum: any, venta: { cantidad: any; }) => sum + venta.cantidad, 0);
        const cantidadVentas = ventas.length;

        // Respuesta
        res.json({
            sumaCantidad,
            cantidadVentas
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener las ventas del mes" });
    }
}