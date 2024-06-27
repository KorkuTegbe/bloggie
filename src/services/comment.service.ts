import { userDb, CommentsDb, BlogPostsDb  } from "../database";
import { BadRequestError, NotFoundError, } from "../exceptions";
import { IService, IComment, IBlogPost } from "../interfaces";
import { APIFeatures } from "../helpers";


export const addAComment = async (body: any, blogId: string ): Promise<IService> => {
   try {
      const { comment, author } = body;
      const blogToComment= await BlogPostsDb.find({ _id: blogId, state: "PUBLISHED" });
      if(!blogToComment) {
         throw new BadRequestError('Blog Post not found')
      }

      const newComment = await CommentsDb.create({
         comment, author, blogPost: blogId
      })

      await BlogPostsDb.updateOne(
         { _id: blogId },
         { $push: { comments: newComment._id } }
      );

      return {
         status: 200,
         success: true,
         message: 'Comment added',
      }
   } catch (error: any) {
      return {
         status: 500,
         success: false,
         message: error.message
     };
   }
}

export const getAComment = async (commentId: string, ): Promise<IService> => {
   try {
      const comment = await CommentsDb.findById(commentId)
      
      if (!comment) {
         throw new BadRequestError('Comment not found')
      }
      return {
         status: 200,
         success: true,
         message: 'succe',
         data: { comment }
      }
   } catch (error: any) {
      return {
         status: 500,
         success: false,
         message: error.message
      };
   }
}
export const deleleAComment = async (commentId: string): Promise<IService> => {
   try {
      const deleted = await CommentsDb.findByIdAndDelete(commentId);

      if (!deleted) {
         throw new BadRequestError('Comment not found')
      }

      return {
         status: 200,
         success: true,
         message: 'Comment deleted'
      }
   } catch (error: any) {
      return {
         status: 500,
         success: false,
         message: error.message
     };
   }
}

