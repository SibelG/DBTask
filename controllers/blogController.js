import mongoose from "mongoose";
import Blog from '../models/Blog.js';
import User from '../models/User.js';

const createBlog = async (req,res) => {

    const { title, description, image, user} = req.body;
    let existingUser;

    try{
        existingUser = await User.findById(user);
    
    } catch(error){
        console.log(error);
    }
    if(!existingUser){
        res.status(400).json({message: "Unable to find user by this id"});
    }

    const blog = new Blog({
        title,
        description,
        image,
        user,
        comments: [],
    })
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({ session });
        existingUser.blogs.push(blog);
        await existingUser.save({ session })
        await session.commitTransaction();

        res.status(200).json({
            succeded: true,
            blog,
        });
    } catch(error){
        res.status(500).json({
            succeded: false,
            error,
    });
 }
    //console.log("REQ BODY", req.body);

};

const getAllBlogs = async (req,res) => {
    try {
        const blogs = await Blog.find({});
        res.status(200).json({
            succeded: true,
            blogs,
        });
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
    });
 }
};



const updateBlog = async (req,res) => {

    const blogId = req.params.id;
    const { title, description} = req.body;
    let blog;

    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description
        });
        res.status(200).json({
            succeded: true,
            blog,
        });
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
    });
    }

}

const getById = async (req,res) => {
    const id = req.params.id;
    let blog;

    try{
        blog = await Blog.findById(id);
        res.status(200).json({
            succeded: true,
            user,
        });
        } catch (error) {
            res.status(404).json({
                succeded: false,
                error,
        });
 }

}

const deleteBlog = async (req,res)=> {
    const id = req.params.id;

    let blog;
    try {
        blog = await Blog.findByIdAndRemove(id).populate('user');
    } catch (err) {
        console.log(err);
    }
    if(!blog){
        res.status(500).json({message:"Unable to delete"});

    }

    res.status(200).json({message:"Succesfully Delete"});

}

export { createBlog, getAllBlogs, updateBlog, getById };