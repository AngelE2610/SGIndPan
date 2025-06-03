import { User } from "./user-model";
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'



export const newUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username: username } });
    if (user) {
        return res.status(400).json({
            msg: `Ya existe el usuario ${username}`
        })
    }

    const passwordCifrada = await bcrypt.hash(password, 10);

    try {
        await User.create({
            username: username,
            password: passwordCifrada
        })
        res.json({
            msg: `Usuario ${username} creado con exito`,
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error'
        })
    }

}

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user: any = await User.findOne({ where: { username: username } });
    if (!user) {
        return res.status(400).json({
            msg: `No existe el usuario ${username} en la BD`
        })
    }

    const passwordAceptada = await bcrypt.compare(password, user.password);
    if (!passwordAceptada) {
        return res.status(400).json({
            msg: `La contraseña introducida es incorrecta`
        })
    }
    const token = jwt.sign({
        username: username
    }, process.env.SECRET_KEY || 'ares123')
    res.json({ token, userId: user.id });
}