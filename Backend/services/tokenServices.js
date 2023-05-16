import jwt from "jsonwebtoken";
import { UserToken } from "../models/userTokenModel.js";

//#region Generate JWT Token
export const generateTokenService = async (userId) => {
    try {

        //generate new token
        let jwtSecretKey = process.env.JWT_SECRET_KEY;

        let generatedTime = new Date().getTime()
        let tokenExpiryTime = generatedTime + 24 * 60 * 60 * 1000   // Token Expires In 1 Day

        let data = {
            userId: userId,
            tokenExpiryTime: tokenExpiryTime
        }

        const token = jwt.sign(data, jwtSecretKey);

        // Deleting Previous Token
        await UserToken.findOneAndDelete({ userId: userId })

        // Creating Token Object To Store In DB
        let tokenObject = {
            userId: userId,
            token: token,
            expiresAt: tokenExpiryTime
        }

        let tokenData = await UserToken.create(tokenObject)
        await tokenData.save()

        // Resolve Promise
        return tokenData
    } catch (error) {
        return Promise.reject(error)
    }
}
//#endregion
//#region Get Token Of User
export const getTokenOfUserService = async (userId) => {
    try {

        //#region Token Pipeline
        let tokenPipeline = [
            {
                $match: {
                    userId: userId
                }
            }
        ]
        //#endregion

        let res = await UserToken.aggregate(tokenPipeline)
        if (res.length > 0) {
            return res[0]
        }
        else {
            return null
        }

    } catch (error) {
        return Promise.reject(error)
    }
}
//#endregion
