// models/Venta.js
import { DataTypes } from "sequelize";
import sequelize from "../database/connection";

export const Venta = sequelize.define('Venta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fechaVenta: {
    type: DataTypes.DATE,
    allowNull: false
  },
  productoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  turnoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});
