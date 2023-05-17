import mongoose from "mongoose";

const userBlogSchema = mongoose.Schema({
    author: { type: mongoose.Types.ObjectId, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true }
},{ timestamps: true })

export const UserBlog = mongoose.model('UserBlog',userBlogSchema,'userBlogs')