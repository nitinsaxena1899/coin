import Joi from "joi";

export const errorHandler = (err, req, res, next) => {
    let status = 500;
    let data = {
        message: 'Internal Server Error'
    }

    if (err instanceof Joi.ValidationError){
        status = 401;
        data.message = err.message;

        return res.status(status).json(data);
    }

    console.log('errorHandler',err)

    if (err.status){
        status = err.status;
    }

    if (err.message){
        data.message = err.message;
    }

    return res.status(status).json(data);
}