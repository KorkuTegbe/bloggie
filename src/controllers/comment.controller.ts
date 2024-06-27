import { Request, Response } from "express";
import { addAComment, deleleAComment, getAComment } from "../services";

export const HandleMakeComment = async (req: any, res: Response) => {
   const body = req.body;
   const blogId  = <string>req.params.blogId;
   
   const response = await addAComment(body, blogId);

   return res.json(response);
}

export const HandleGetAComment = async (req: any, res: Response) => {
   const { commentId } = req.params;
   const response = await getAComment(commentId);

   return res.json(response)
}

export const HandleDeleteComment = async (req: Request, res: Response) => {
   const { commentId } = req.params
   const response = await deleleAComment(commentId);
   return res.json(response)
}

