import { Router } from "express";
import { RequireAuth } from "../middleware";
import { 
   HandleCreateBlog, 
   HandleDeleteBlogPost, 
   HandleEditBlogPost, 
   HandleGetABlogPost, 
   HandleGetAuthorBlogPosts, 
   HandleGetPublishedBlogPosts, 
   HandlePublishBlog, 
} from "../controllers";
import { blogPostInputValidation } from "../validators/validators";


export const BlogRouter = Router();

BlogRouter.post('/blog', RequireAuth, blogPostInputValidation, HandleCreateBlog);
BlogRouter.patch('/blog/:blogId', RequireAuth, HandlePublishBlog);
BlogRouter.put('/blog/:blogId', RequireAuth, blogPostInputValidation, HandleEditBlogPost);
BlogRouter.get('/blog/all', HandleGetPublishedBlogPosts);
BlogRouter.get('/blog/user', RequireAuth, HandleGetAuthorBlogPosts)
BlogRouter.get('/blog/:blogId', HandleGetABlogPost)
BlogRouter.delete('/blog/:blogId', RequireAuth, HandleDeleteBlogPost)