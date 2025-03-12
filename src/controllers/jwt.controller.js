import {getUserByEmail, postUser, verifyPass} from "../services/user.service.js"
import jwt from "jsonwebtoken"

export const JWT_SECRET = 'superSecret'

export async function signUp(req, res) {
    const user = req.body

    console.log("user in signUp: ", user)

    await postUser(user)
    return res.json({
        status: "OK"
    })
}

export function signIn(req, res) {
    const {email, password} = req.body
    const user = getUserByEmail(email)

    if (!user || !verifyPass(user, password)) {
        return res.json({
            status: "Error",
            message: "Incorrect creds"
        })
    }

    const token = jwt.sign({
        email: user.email,
        role: ['admin', 'dev'],
        permissions: ['read', 'write']
    }, JWT_SECRET, {
        expiresIn: 900
    })

    const token2 = jwt.sign({
        email: user.email,
        role: ['admin', 'dev'],
        permissions: ['read', 'write']
    }, JWT_SECRET, {
        expiresIn: '7 days'
    })
    res.cookie('token', token)
    res.cookie('refreshToken', token2)
    return res.json({
        status: "OK",
        token,
        refreshToken: token2
    })
}

export function account(req, res) {
    return res.json({
        status: "OK",
        "path": "My account"
    })
}