import mongoose from "mongoose";

const { Schema } = mongoose;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true,

    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    comments: [{
        type: mongoose.Types.ObjectId,
        ref: "Comment",
        required: true
      }],
    
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;