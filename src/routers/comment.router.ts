import { Router } from "express";
import { HandleDeleteComment, HandleGetAComment, HandleMakeComment } from "../controllers";
import { commentInputValidation } from "../validators/validators";

export const CommentRouter = Router();

CommentRouter.post('/comment/:blogId', commentInputValidation, HandleMakeComment);
CommentRouter.get('/comment/:commentId', HandleGetAComment);
CommentRouter.delete('/comment/:commentId', HandleDeleteComment)
// CommentRouter.get('/')