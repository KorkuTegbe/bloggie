import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IBlogPost } from '../../interfaces';
import { config } from '../../constants';

enum BlogState {
    PUBLISHED = "PUBLISHED",
    DRAFT = "DRAFT"
}

const BlogPostSchema = new Schema<IBlogPost>({
    _id: {
        type: String,
        default: function genUUID() {
            return uuidv4()
        }
    },

    title: { type: String },
    
    content: { type: String },

    readingTime: { type: Number },
    
    state: { 
        type: String, 
        enum: Object.values(BlogState), 
        default: BlogState.DRAFT 
    },
    author: {
        type: String, 
        ref: config.mongodb.collections.users,
        required: true
    },
    comments: [{
        type: String,
        ref: config.mongodb.collections.comments
    }]
},{
    toObject: {
       virtuals: true,
       transform(doc, ret) {
          ret.id = ret._id;
          delete ret._id;
          return ret;
       }
    },
    toJSON: {
       virtuals: true,
       transform(doc, ret) {
          ret.id = ret._id;
          delete ret._id;
          return ret;
       }
    },
    timestamps: true,
    versionKey: false
})


export const BlogPostsDb = mongoose.model<IBlogPost>(config.mongodb.collections.blogPosts, BlogPostSchema)