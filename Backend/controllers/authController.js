import Joi from "joi";
import { userLoginService, userLogoutService, userRegisterService } from "../services/authServices.js"

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
        const accessToken = await userRegisterService(email, password)

        res.cookie("accessToken", accessToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
        });

        return res.status(200).json({ message: 'Success', token: accessToken })
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
        const result = await userLoginService(email, password)
        console.log(result)
        res.cookie("accessToken", result.token, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
        });

        return res.status(200).json({ message: 'Success', result: result })
    } catch (error) {
        return next(error)
    }
}

export const userLogOutController = async (req, res, next) => {
    try {
        console.log('cookie', req.cookies.accessToken)
        await userLogoutService(res)
        return res.status(200).json({ message: 'Logged out', })
    } catch (error) {
        return next(error)
    }
}