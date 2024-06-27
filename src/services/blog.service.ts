import { userDb, CommentsDb, BlogPostsDb  } from "../database";
import { BadRequestError, NotFoundError, } from "../exceptions";
import { IService, IComment, ISearchQuery, IBlogPost } from "../interfaces";
import { APIFeatures } from "../helpers";



// function to calculate reading time
const readingTime = (content: string): number => {
    const wordCount = content.split(' ').length
    // assuming the average person reads 200 words a minute
    const wordsPerMin = wordCount / 200
    return Math.round(wordsPerMin) === 0 ? 1 : Math.round(wordsPerMin)
}


export const createABlogPost = async (body: IBlogPost, userId: string, ): Promise<IService> => {
    try {
        const { title, content } = body
        const time = readingTime(content)
        const blogPost = await BlogPostsDb.create({
            title, content, author: userId, readingTime: time 
        }) 

        return {
            status: 200,
            success: true,
            message: 'Blog Post created successfully'
        }
    } catch (error: any) {
        return {
            status: error.statusCode,
            success: false,
            message: error.message
        };
    }
}

export const publishBlog = async (userId: string, blogId: string): Promise<IService> => {
    try {
        const blog = await BlogPostsDb.findOne({ author: userId, _id: blogId });
        
        if (!blog) {
            throw new BadRequestError()
        }
        
        await BlogPostsDb.updateOne({state: "DRAFT"}, { state: "PUBLISHED"});

        return {
            status: 200,
            success: true,
            message: 'Blog Post published successfully',
        }
    } catch (error: any) {
        return {
            status: error.statusCode,
            success: false,
            message: error.message
        };
    }
}

export const editBlogPost = async (body: IBlogPost, userId: string, blogId: string): Promise<IService> => {
    try {
        const { title, content } = body;
        const readTime = readingTime(content);
        const blog = await BlogPostsDb.findOneAndUpdate(
            { author: userId, _id: blogId },
            { title, content, readingTime: readTime },
            { upsert: true }
        ); 

        return {
            status: 200,
            success: true,
            message: 'Blog Post updated successfully'
        }
    } catch (error: any) {
        return {
            status: error.statusCode,
            success: false,
            message: error.message
        };
    }
}

export const getABlogPost = async (query: any, blogId: string): Promise<IService> => {
    try {
        const filter = { state: 'PUBLISHED', _id: blogId }
        const features = new APIFeatures(BlogPostsDb.find(filter), query);
  
        const blogPost = await features.query.populate([
            {
                path: 'comments',
                select: 'comment author'
            },
            {
                path: 'author',
                select: 'name',
            },
        ]);
  
        return {
           success: true,
           message: 'success', 
           status: 200,
           data: {
              blogPost
           }
        };
    } catch (error: any) {
        return {
            status: error.statusCode,
            success: false,
            message: error.message
        };
    }
}

export const getPublishedBlogPosts = async (query: any): Promise<IService> => {
    try {
        const filter = { state: 'PUBLISHED'}
        const features = new APIFeatures(BlogPostsDb.find(filter), query).filter().sort().limitFields().paginate();
        const limit = features.queryString.limit;
        const page = features.queryString.page;
  
        // const blogPosts = await features.query.populate([
        //     {
        //         path: 'author',
        //         select: 'name',
        //     },
        //     {
        //         path: 'comments',
        //         select: 'comment author'
        //     }
        // ]);
        // const blogPosts = await features.query.populate('comments') //.populate('comments')
        const blogPosts = await BlogPostsDb.find({ state: 'PUBLISHED'}).populate([
            {
                path: 'author',
                select: 'name',
            },
            {
                path: 'comments',
                select: 'comment author',
            },
        ])
        const count = await BlogPostsDb.countDocuments(filter);
  
        return {
           success: true,
           message: 'success',
           status: 200,
           data: {
              totalCount: count,
              limit, page,
              lastPage: Math.ceil(count / limit),
              blogPosts
           }
        };
    } catch (error: any) {
        return {
            status: error.statusCode,
            success: false,
            message: error.message
        };
    }
}

export const getAuthorsOwnBlogPosts = async (query: any, userId: string): Promise<IService> => {
    try {
        // const blogPosts = await BlogPostsDb.find({ author: userId })
        const filter = { author: userId }
        const features = new APIFeatures(BlogPostsDb.find(filter), query).filter().sort().limitFields().paginate();
        const limit = features.queryString.limit;
        const page = features.queryString.page;
  
        const blogPosts = await features.query.populate([
            {
                path: 'author',
                select: 'name',
            },
            {
                path: 'comments',
                select: 'comment author'
            }
        ]);
        const count = await BlogPostsDb.countDocuments(filter);
  
        return {
           success: true, //SUCCESS_STATUS,
           message: 'success', //this.SUCCESS_MSG,
           status: 200, //this.SUCCESS_CODE,
           data: {
              totalCount: count,
              limit, page,
              lastPage: Math.ceil(count / limit),
              blogPosts
           }
        };
    } catch (error: any) {
        return {
            status: error.statusCode,
            success: false,
            message: error.message
        };
    }
}

export const deleteBlogPost = async (userId: string, blogId: string): Promise<IService> => {
    try {
        const blogToDelete = await BlogPostsDb.findOneAndDelete({ author: userId, _id: blogId })

        if (!blogToDelete) {
            throw new NotFoundError('Blog not found')
        }
        
        return {
            status: 200,
            success: true,
            message: 'Blog Post deleted successfully',
        }
    } catch (error: any) {
        return {
            status: error.statusCode,
            success: false,
            message: error.message
        };
    }
}