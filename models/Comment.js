import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema({
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
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    blog: {
        type: mongoose.Types.ObjectId,
        ref: "Blog",
        required: true,
    },
    
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;