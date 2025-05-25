// models/Panaderia.js
import { DataTypes } from 'sequelize';
import sequelize from '../database/connection';

export const Panaderia = sequelize.define('Panaderia', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  userId: {
     type: DataTypes.INTEGER,
    allowNull: false
     }
});
