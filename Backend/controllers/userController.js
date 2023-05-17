import Joi from "joi";
import { userCreateBlogService, userDeleteBlogService, userGetAllBlogService, userGetBlogByIdService, userUpdateBlogService } from "../services/userServices.js";

const mongoDbIdPattern = /^[0-9a-fA-F]{24}$/

export const userCreateBlogController = async (req, res, next) => {
    try {
        const { author, title, content } = req.body


        const blogValidationSchema = Joi.object({
            author: Joi.string().regex(mongoDbIdPattern).required(),
            title: Joi.string().required(),
            content: Joi.string().required()
        });

        const { error } = blogValidationSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        const result = await userCreateBlogService(author, title, content)


        return res.status(200).json({ message: 'Success', result: result })
    } catch (error) {
        return next(error)
    }
}

export const userGetBlogByIdController = async (req, res, next) => {
    try {
        const { id } = req.query

        const iDValidationSchema = Joi.object({
            id: Joi.string().regex(mongoDbIdPattern).required(),
        });

        const { error } = iDValidationSchema.validate(req.query);

        if (error) {
            return next(error);
        }

        const result = await userGetBlogByIdService(id)
        return res.status(200).json({ message: 'Success', result: result })

    } catch (error) {
        return next(error)
    }

}

export const userGetAllBlogController = async (req, res) => {
    try {
        const result = await userGetAllBlogService()
        return res.status(200).json({ message: 'Success', result: result })
    } catch (error) {
        return next(error)
    }
}

export const userUpdateBlogController = async (req, res) => {
    try {
        const { id } = req.body

        const result = await userUpdateBlogService(id)
        return res.status(200).json({ message: 'Success', result: result })
    } catch (error) {
        return next(error)
    }
}

export const userDeleteBlogController = async (req, res) => {
    try {
        const result = await userDeleteBlogService()
        return res.status(200).json({ message: 'Success', result: result })
    } catch (error) {
        return next(error)
    }
}
