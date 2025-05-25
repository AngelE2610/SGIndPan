import sequelize from "../database/connection";
import { Cargo } from "./cargo";
import { Trabajador } from "./trabajador";
import { TipoPan } from "./tipo-pan"; 
import { Producto } from "./producto"; 
import { Turno } from "./turno"; 
import { Venta } from "./venta"; 
import { TurnoProducto } from "./turno-producto";
import { registerTurnoProductoHooks } from "./hooks/turno-productos-hooks";
import { Panaderia } from "./panaderia";
import { User } from "../login/user-model";

// Definir asociaciones

//Panaderia 1:N Turno
Panaderia.hasMany(Turno, { foreignKey: 'panaderiaId' });
Turno.belongsTo(Panaderia, { foreignKey: 'panaderiaId' });

//Panaderia 1:N Producto
Panaderia.hasMany(Producto, { foreignKey: 'panaderiaId' });
Producto.belongsTo(Panaderia, { foreignKey: 'panaderiaId' });

//Panaderia 1:N Trabajador
Panaderia.hasMany(Trabajador, { foreignKey: 'panaderiaId' });
Trabajador.belongsTo(Panaderia, { foreignKey: 'panaderiaId' });

//user 1:N panaderia
User.hasMany(Panaderia, { foreignKey: 'userId' });
Panaderia.belongsTo(User, { foreignKey: 'userId' });


// Trabajador N:1 Cargo
Cargo.hasMany(Trabajador, { foreignKey: 'cargoId' });
Trabajador.belongsTo(Cargo, { foreignKey: 'cargoId' });

// Turno N:M Producto
Turno.belongsToMany(Producto, { through: TurnoProducto, foreignKey: 'turnoId' });
Producto.belongsToMany(Turno, { through: TurnoProducto, foreignKey: 'productoId' });


export {
  sequelize,
  Cargo,
  Trabajador,
  TipoPan,
  Producto,
  Turno,
  Venta,
  Panaderia,
  User,
  TurnoProducto,
};
