// Importing module
import bcrypt from 'bcryptjs'

export const encryptPassword = async (password) => {
    try {
        var salt = bcrypt.genSaltSync(10)
        var hash = bcrypt.hashSync(password, salt);
        return hash
    } catch (error) {
        return Promise.reject(error)
    }
}

export const comparePassword = async (password, hashedPassword) => {
    try {
        const result = await bcrypt.compare(password, hashedPassword)
        // console.log('isPasswordMatched',result)
        return result
    } catch (error) {
        return Promise.reject(error)
    }
}

