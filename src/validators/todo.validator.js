import Joi from "joi"
import {idExists} from "../services/todo.service.js";

export function createTodoValidator(req, res, next) {

    const toDoSchema = Joi.object({
        status: Joi.string().min(2).max(10).required(),
        text: Joi.string().min(5).max(100).required(),
    })

    const {error} = toDoSchema.validate(req.body.data, {
        allowUnknown: false,
        abortEarly: false
    })

    if (error) {
        return res.status(400).json({
            message: "Validation errors",
            details: error.details.map(itm => itm.message)
        })
    }
    next();
}

export function updateTodoValidator(req, res, next) {

    const toDoSchema = Joi.object({
        status: Joi.string().min(2).max(10).required(),
    })

    const {error} = toDoSchema.validate(req.body.data, {
        allowUnknown: false,
        abortEarly: false
    })

    if (error) {
        return res.status(400).json({
            message: "Validation errors",
            details: error.details.map(itm => itm.message)
        })
    }

    next();
}

export function itemIdValidator(req, res, next) {

    const toDoSchema = Joi.object({
        itemId: Joi.custom(() => {
            if (!idExists(req.params.itemId)) {
                throw new Error("Not found itemId")
            }
        }).required()

    })

    const {error} = toDoSchema.validate(req.params, {
        allowUnknown: false,
        abortEarly: false
    })

    if (error) {
        return res.status(400).json({
            message: "Validation errors",
            details: error.details.map(itm => itm.message)
        })
    }
    next();
}