import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken'


const validateToken = (req:Request, res:Response,next:NextFunction) => {
    const headerToken = req.headers['authorization'];
    if(headerToken != undefined && headerToken.startsWith('Bearer')){
        //tiene token 
        try {
            //quitandole los primeros 7 caracteres que no interesan
        const barerToken = headerToken.slice(7);

        jwt.verify(barerToken, process.env.SECRET_KEY || 'ares123');
        
        next();
        } catch (error) {
            res.status(401).json({
                msg:'token invalido'
            })
        }
        
    }else{
        res.status(401).json({
            msg: 'Acceso denegado'
        })
    }
    
}

export default validateToken;