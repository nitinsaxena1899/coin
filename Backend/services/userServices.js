import { UserBlog } from "../models/userBlogModel.js"

export const userCreateBlogService = async (author, title, content) => {
    try {
        const data = {
            author: author,
            title: title,
            content: content
        }
        const userBlog = await UserBlog.create(data)
        const userSavedBlog = await userBlog.save()

        return Promise.resolve(userSavedBlog)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const userGetBlogByIdService = async (id) => {
    try {
        const blog = await UserBlog.findById({ _id: id })

        if (blog) {
            return Promise.resolve(blog)
        }

        return Promise.reject({ status: 409, message: 'No blog !' })
    } catch (error) {
        return Promise.reject(error)

    }
}

export const userGetAllBlogService = async () => {
    try {
        const blogs = await UserBlog.find()
        if (blogs.length > 0) {
            return Promise.resolve(blogs)
        }

        return Promise.reject({ status: 409, message: 'No blog !' })
    } catch (error) {

    }
}

export const userUpdateBlogService = async (id) => {
    try {
        const blogs = await UserBlog.findById({ _id: id })
        if (blogs.length > 0) {
            return Promise.resolve(blogs)
        }

        return Promise.reject({ status: 409, message: 'No blog !' })
    } catch (error) {

    }
}

export const userDeleteBlogService = async () => {
    try {
        const blogs = await UserBlog.find()
        if (blogs.length > 0) {
            return Promise.resolve(blogs)
        }

        return Promise.reject({ status: 409, message: 'No blog !' })
    } catch (error) {

    }
}

