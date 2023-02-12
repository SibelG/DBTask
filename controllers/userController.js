import User from "../models/User.js";
import bcrypt from 'bcryptjs';

const createUser = async (req,res) => {

    const {name,email,password} = req.body;
    let existingUser;

    try{
        existingUser = await User.findOne({ email });
    
    } catch(error){
        console.log(error);
    }
    if(existingUser){
        res.status(400).json({message: "User already existing"});
    }
    //const user = await User.create(req.body);
    const hashedPassword = bcrypt.hashSync(password);

    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs: [],
        comments: [],
    });
  
    try {
    
        await user.save();
        res.status(201).json({
            succeded: true,
            user,
        });
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
    });
    }

 }
    //console.log("REQ BODY", req.body);


const getAllUsers = async (req,res) => {
    try {
        const users = await User.find({});
        res.status(200).json({
            succeded: true,
            users,
        });
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
    });
 }
};

const loginUser = async (req,res) => {
    const { email, password } = req.body;
    let existingUser;

    try {
        existingUser = await User.findOne({ email });

    } catch (error) {
        return console.log(error);
    }
    if(!existingUser){
        res.status(404).json({ message: "Couldn't find User By this Email"});
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

    if(!isPasswordCorrect){
        res.status(400).json({ message :"Incorrect Password "});

    }
   res.status(200).json({ message: "Login Successful" });
}




export { createUser, getAllUsers, loginUser };