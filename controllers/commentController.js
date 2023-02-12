import mongoose from "mongoose";
import Comment from "../models/Comment.js";
import User from "../models/User.js";

const createComment = async (req,res) => {

    const { title, description, user, blog} = req.body;
    let existingUser;

    try{
        existingUser = await User.findById(user);
    
    } catch(error){
        console.log(error);
       
    }
    if(!existingUser){
        res.status(400).json({message: "Unable to find user by this id"});
    }

    const comment = new Comment({
        title,
        description,
        user,
        blog,

    })
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await comment.save({ session });
        existingUser.comments.push(comment);
        await existingUser.save({ session })
        await session.commitTransaction();

        res.status(200).json({
            succeded: true,
            comment,
        });
    } catch(error){
        res.status(500).json({
            succeded: false,
            error,
    });
 }
    //console.log("REQ BODY", req.body);

};

const getAllComments = async (req,res) => {
    try {
        const comments = await Comment.find({});
        res.status(200).json({
            succeded: true,
            comments,
        });
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
    });
 }
};



export { createComment, getAllComments };