import Joi from "joi";
import { userLoginService, userRegisterService } from "../services/authServices.js"

export const userRegisterController = async (req, res, next) => {
    try {
        const userValidationRegisterSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        });
        const { error } = userValidationRegisterSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        const { email, password } = req.body
        await userRegisterService(email, password)

        return res.status(200).json({ message: 'Success' })
    } catch (error) {
        return next(error)
    }
}

export const userLoginController = async (req, res, next) => {
    try {
        const userValidationLoginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        });
        const { error } = userValidationLoginSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        const { email, password } = req.body
        await userLoginService(email, password)

        return res.status(200).json({ message: 'Success' })
    } catch (error) {
        return next(error)
    }
}