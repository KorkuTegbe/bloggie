import { Document } from 'mongoose'


export interface IComment extends Document {
    _id: string;
    comment: string;
    author: string;
    blogPost: string;
    createdAt: Date;
    updatedAt: Date;
}
