import { Document } from "mongoose";

export interface IBlogPost extends Document {
    _id: string;
    title: string;
    content: string;
    state: string;
    readingTime: number;
    published: boolean,
    comments: string[],
    numberOfReads: number;
    createdAt: Date;
    updatedAt: Date;
    author: string;
}