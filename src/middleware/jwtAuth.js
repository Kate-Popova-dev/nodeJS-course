import jwt from "jsonwebtoken"
import {JWT_SECRET} from "../controllers/jwt.controller.js"

export const jwtMiddleware = (req, res, next) => {

    if (!req.cookies.token) {
        return res.json({error: "missing token"})
    }

    const token = String(req.cookies.token)

    try {
        const decodeToken = jwt.verify(token, JWT_SECRET)

        next()
        return res.json({
            message: 'Authorized',
            status: "Ok verify",
            data: decodeToken,
        })

    } catch (err) {

        if (req.cookies?.refreshToken) {

            const refreshToken = req.cookies.refreshToken;
            let decodeRefreshToken = '';
            try {
                decodeRefreshToken = jwt.verify(refreshToken, JWT_SECRET)
            } catch (err) {

                return res.json({
                    message: 'Unauthorized',
                    status: "Error verify",
                    err
                })
            }
            const accessToken = jwt.sign({
                email: decodeRefreshToken.email,
                role: decodeRefreshToken.role,
                permissions: decodeRefreshToken.permissions,
            }, JWT_SECRET, {
                expiresIn: 900
            });

            res.cookie('token', accessToken)
        } else {
            return res.status(401).json({message: 'Unauthorized, not refreshToken'});
        }
    }
    next()
}