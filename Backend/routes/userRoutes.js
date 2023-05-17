import express from "express";
import { userCreateBlogController, userDeleteBlogController, userGetAllBlogController, userGetBlogByIdController, userUpdateBlogController } from "../controllers/userController.js";
import { auth } from "../middelwares/auth.js";

const router = express.Router()

router.post('/createBlog',[auth],userCreateBlogController)
router.get('/getBlogById',[auth],userGetBlogByIdController)
router.get('/getAllBlog',[auth],userGetAllBlogController)
router.patch('/updateBlog',[auth],userUpdateBlogController)
router.delete('/deleteBlog',[auth],userDeleteBlogController)



export default router