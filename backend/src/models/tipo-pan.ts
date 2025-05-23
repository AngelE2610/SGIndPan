// models/TipoPan.js
import { DataTypes } from "sequelize";
import sequelize from "../database/connection";

export const TipoPan = sequelize.define('TipoPan', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cantidad:{
    type:DataTypes.INTEGER,
    allowNull:false
  },
  turnoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});
