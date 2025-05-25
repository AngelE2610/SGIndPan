// models/TurnoProducto.js
import { DataTypes, Transaction } from "sequelize";
import sequelize from "../database/connection";

export const TurnoProducto = sequelize.define('TurnoProducto', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  turnoId: { type: DataTypes.INTEGER, allowNull: false },
  productoId: { type: DataTypes.INTEGER, allowNull: false },
  cantidadUsada: { type: DataTypes.INTEGER, allowNull: false }
  // Puedes agregar otros campos si quieres, como observaciones, etc.
});


