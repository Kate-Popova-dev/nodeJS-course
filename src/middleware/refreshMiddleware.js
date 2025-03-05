import jwt, {decode} from "jsonwebtoken";
import {JWT_SECRET} from "../controllers/jwt.controller.js";


export const refreshMiddleware = (req, res, next) => {

    if (req.cookies?.refreshToken) {

        const refreshToken = req.cookies.refreshToken;

        try {
            const decode = jwt.verify(refreshToken, JWT_SECRET)

            const accessToken = jwt.sign({
                email: decode.email,
                role: ['admin', 'dev'],
                permissions: ['read', 'write']
            }, JWT_SECRET, {
                expiresIn: '10m'
            });
            console.log("decode: ", {decode})

            return res.json({
                status: "OK",
                accessToken,
            })
        } catch (err) {
            return res.json({
                message: 'Unauthorized',
                status: "Error verify",
                decode: decode,
                err
            })
        }
    } else {
        return res.status(406).json({message: 'Unauthorized'});
    }

}