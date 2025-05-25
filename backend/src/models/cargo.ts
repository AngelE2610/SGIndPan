import { DataTypes } from "sequelize";
import sequelize from "../database/connection";

export const Cargo= sequelize.define(
    'Cargo',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
  },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
  }
    }
)