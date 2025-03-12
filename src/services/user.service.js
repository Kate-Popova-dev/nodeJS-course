import crypto from "crypto";
import sequelize from "../models/index.js";
import User from "../models/user.model.js";

const users = [];

export function getUsers() {
    return users.find(user => user.id === parseInt(id))
}

export function getUserByEmail(email) {
    return users.find(user => user.email === email)
}

export function verifyPass(user, password) {
    const hash = getHashByPassword(password)

    return hash === user.password
}

export async function postUser(user) {

    const t = await sequelize.transaction();
    try {
        await User.create({
            name: user.username,
            email: user.email,
            password: getHashByPassword(user.password)
        }, {transaction: t})

        await t.commit()

    } catch (error) {

        console.log({error})

        await t.rollback()
    }
}

function getHashByPassword(pass) {
    return crypto.createHash("md5").update(pass).digest().toString("hex")
}