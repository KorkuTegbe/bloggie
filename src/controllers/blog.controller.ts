import { Request, Response } from "express";
import { createABlogPost, deleteBlogPost, editBlogPost, getABlogPost, getAuthorsOwnBlogPosts, getPublishedBlogPosts, publishBlog } from "../services";


export const HandleCreateBlog = async (req: any, res: Response) => {
   const body = req.body;
   const userId = <string>req.user.id;

   const response = await createABlogPost(body, userId);

   return res.json(response);
}

export const HandlePublishBlog = async (req: any, res: Response) => {
   const userId = <string>req.user.id;
   const blogId = <string>req.params.blogId

   const response = await publishBlog(userId, blogId)

   return res.json(response);
}

export const HandleEditBlogPost = async (req: any, res: Response) => {
   const userId = <string>req.user.id;
   const blogId = <string>req.params.blogId;
   const body = req.body

   const response = await editBlogPost(body, userId, blogId);

   return res.json(response);
}

export const HandleGetPublishedBlogPosts = async (req: any, res: Response) => {
   const query = <unknown>req.query
   const response = await getPublishedBlogPosts(query, );

   return res.json(response);
}

export const HandleGetAuthorBlogPosts = async (req: any, res: Response) => {
   const query = <unknown>req.query;
   const userId = <string>req.user.id;
   const response = await getAuthorsOwnBlogPosts(query, userId);

   return res.json(response);
}

export const HandleGetABlogPost = async (req: any, res: Response) => {
   const query = <unknown>req.query;
   const { blogId } = req.params
   const response = await getABlogPost(query, blogId)
   return res.json(response)
}

export const HandleDeleteBlogPost = async (req: any, res: Response) => {
   const userId = <string>req.user.id;
   const blogId = <string>req.params.blogId;
   const response = await deleteBlogPost(userId, blogId);

   return res.json(response);
}