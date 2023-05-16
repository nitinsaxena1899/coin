import { comparePassword } from "../helpers/passwordEncryption.js"
import { encryptPassword } from "../helpers/passwordEncryption.js"
import User from "../models/userRegisterModel.js"
import { generateTokenService, getTokenOfUserService } from "./tokenServices.js"

export const userRegisterService = async (email, password) => {
    try {
        const userExist = await User.find({ email })
        if (userExist.length != 0) {
            return Promise.reject({ status: 409, message: 'Email already registered, use another email!' })
        }

        const hashedPassword = await encryptPassword(password)


        const userObject = {
            email: email,
            password: hashedPassword
        }
        const user = await User.create(userObject)
        await user.save()

        console.log(user)

        if (user) {
            const generatedToken = await generateTokenService(user._id)
            return Promise.resolve(generatedToken)
        }
        console.log(user)


    } catch (error) {
        return Promise.reject(error)
    }
}

export const userLoginService = async (email, password) => {
    try {
        const user = await User.find({ email })

        if (user.length == 0) {
            return Promise.reject({ status: 409, message: 'Email is not registered, please register !' })
        }
        const hashedPassword = user[0].password

        const isPasswordMatched = await comparePassword(password, hashedPassword)
        console.log('isPasswordMatched', isPasswordMatched)

        if (isPasswordMatched) {

            // getting Token of User
            let tokenObj = await getTokenOfUserService(user[0]._id)

            if (tokenObj == null || new Date().getTime() > tokenObj.expiresAt) {
                await generateTokenService(user[0]._id)
                // getting Token of User
                tokenObj = await getTokenOfUserService(user[0]._id)
            }

            return {
                token: tokenObj.token,
                expiresAt: tokenObj.expiresAt,
                email: user[0].email
            }
        }
        else {
            // Return Error Message Because Password Does Not Matched
            return Promise.reject({ status: 409, message: 'Password is incorrect !' })
        }



    } catch (error) {
        return Promise.reject(error)
    }

}

export const userLogoutService = (res) => {
    try {
        // const { accessToken } = res.cookies
        res.clearCookie('accessToken')
        return
    } catch (error) {
        return Promise.reject(error)

    }
}