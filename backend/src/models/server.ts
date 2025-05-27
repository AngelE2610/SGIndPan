import express,{Application} from 'express';
import cors from 'cors';
import userRout from '../login/user-routes';
import productosRout from '../routes/producto'
import turnoRoute from '../routes/turno';
import cargoRoute from '../routes/cargo';
import trabajadorRout from '../routes/trabajador';
import panRout from '../routes/pan';
import panadRout from '../routes/panaderia';
import ventaRuta from '../routes/venta';
import { sequelize } from './index';


class Server{
    private app: Application;
    private port?: string;

    constructor(){
        this.app=express();
        this.port=process.env.PORT;
        this.listen();
        this.midleware();
        this.router();
        this.DBconnect();
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('server escuchando peticiones en el puerto:'+ this.port);
        })
    }
    midleware(){
        //parseo body
        this.app.use(express.json());
        //cors
        this.app.use(cors());
    }

    router(){
        this.app.use('/SGIndPan/users',userRout);
        this.app.use('/SGIndPan/productos',productosRout);
        this.app.use('/SGIndPan/turno',turnoRoute);
        this.app.use('/SGIndPan/cargo',cargoRoute);
        this.app.use('/SGIndPan/trabajador',trabajadorRout);
        this.app.use('/SGIndPan/pan',panRout);
        this.app.use('/SGIndPan/panaderia',panadRout);
        this.app.use('/SGIndPan/ventas',ventaRuta);
    }

    async DBconnect(){
        try {
            await sequelize.sync({ alter: true });
        } catch (error) {
            console.log('error de conexion', error);
        }
    }


}
export default Server;