import { comparePassword } from "../helpers/passwordEncryption.js"
import { encryptPassword } from "../helpers/passwordEncryption.js"
import User from "../models/userRegisterModel.js"

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

        return Promise.resolve()
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
        console.log('isPasswordMatched',isPasswordMatched)
        if(isPasswordMatched){
            
        }
    } catch (error) {
        return Promise.reject(error)
    }

}