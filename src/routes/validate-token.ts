import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers['authorization']

    if(headerToken != undefined && headerToken.startsWith('Bearer ')){
        // Tiene token

        const bearerToken = headerToken.slice(7);

        try {
            const tokenValido = jwt.verify(bearerToken, process.env.KEY_SECRET || '=?2{s>%qGmnG?5t)')
            console.log(tokenValido)

            next();
        } catch (error) {
            res.status(400).json({
                error: 'token no válido'
            })
        }

        

    } else {
        res.status(400).json({
            error: 'Acceso denegado'
        })
    }
    console.log(headerToken)

}

export default validateToken;