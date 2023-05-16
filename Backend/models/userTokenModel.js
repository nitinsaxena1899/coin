import mongoose from "mongoose";

const userTokenSchema = mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    token: String,
    expiresAt: Number
},{ timestamps: true })

export const UserToken = mongoose.model('UserToken',userTokenSchema,'userTokens')