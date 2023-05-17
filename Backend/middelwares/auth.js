import jwt from "jsonwebtoken"
// import APIError, { HttpStatusCode } from "../exception/errorHandler.js";
// import { getObjectId } from "../helpers/mongoose/mongooseHelpers.js";

export const auth = async (req, res, next) => {
    try {
        const token = req.cookies['x-auth-token'];
        if (!token) {
            next({ status: 409, message: 'UNAUTHORIZED_REQUEST' })
        }
        const verify = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDYzYzdmYzNlZjQ2YmQ1NjVhOGJlNzIiLCJ0b2tlbkV4cGlyeVRpbWUiOjE2ODQzNDc4NjgzMjMsImlhdCI6MTY4NDI2MTQ2OH0.hyx6-1sDZgq42CsgrWMB5uIhM5JawKfdBOD5T9UT75g', process.env.JWT_SECRET_KEY);
        if (new Date().getTime() > verify.tokenExpiryTime) {
            next({ status: 409, message: 'Token has been expired. Kindly Relogin!' })
        }
        // const userId = getObjectId(verify.userId)
        // req.body.userId = userId
        next();
    } catch (error) {
        next(error)
    }
}


