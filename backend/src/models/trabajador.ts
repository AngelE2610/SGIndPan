// models/Trabajador.js
import { DataTypes } from "sequelize";
import sequelize from "../database/connection";
import { Cargo } from "./cargo";


export const Trabajador = sequelize.define('Trabajador', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  salario: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  cargoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Cargo,
      key: 'id'
    }
  },
  numeroTurno: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  panaderiaId: {
     type: DataTypes.INTEGER,
    allowNull: false
     }
});
