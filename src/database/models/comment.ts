import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IComment } from '../../interfaces';
import { config } from '../../constants';


const CommentSchema = new Schema<IComment>({
    _id: {
        type: String,
        default: function genUUID() {
            return uuidv4()
        }
    },
    comment: { type: String, required: true },

    author: { 
        type: String,
        required: true,
        default: 'Anonymous'
    },
    
    blogPost: {
        type: String,
        ref: config.mongodb.collections.blogPosts,
        required: true
    }
}, {
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

export const CommentsDb = mongoose.model<IComment>(config.mongodb.collections.comments, CommentSchema)