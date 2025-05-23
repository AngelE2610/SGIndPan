


export function registerTurnoProductoHooks(TurnoProducto:any){
  TurnoProducto.afterCreate(async(turnoProducto:any,options: { transaction: any; })=>{
  const producto = await (turnoProducto as any).getProducto({
    transaction:options.transaction
  });
  if(producto.existencias < turnoProducto.cantidadUsada){
    throw new Error(`No hay suficiente stock del producto ${producto.nombre}`)
  }

  await producto.decrement('existencias',{
    by:turnoProducto.cantidadUsada,
    transaction:options.transaction
  })
})
}