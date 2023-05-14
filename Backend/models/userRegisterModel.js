import mongoose from "mongoose";

const userRegisterSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
}, { timestamps: true })

const User = mongoose.model('User', userRegisterSchema, 'users')

export default User