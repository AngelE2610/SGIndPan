// models/Turno.js
import { DataTypes } from "sequelize";
import sequelize from "../database/connection";

export const Turno = sequelize.define('Turno', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  numero: { 
    type: DataTypes.INTEGER, 
    allowNull: false ,
    unique:true
  },
  panaderiaId: {
     type: DataTypes.INTEGER,
    allowNull: false
     }
});
