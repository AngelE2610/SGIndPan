// models/Producto.js
import { DataTypes } from "sequelize";
import sequelize from "../database/connection";

export const Producto = sequelize.define('Producto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  existencias: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fechaAdquisicion: {
    type: DataTypes.DATE,
    allowNull: false
  },
  panaderiaId: {
     type: DataTypes.INTEGER,
    allowNull: false
     }
});
