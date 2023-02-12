import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import validator from 'validator';

const { Schema } = mongoose;


const userSchema = new Schema(
    {
      name: {
        type: String,
        required: [true, 'Username area is required'],
       
      },
      email: {
        type: String,
        required: [true, 'Email area is required'],
        unique: true,
        
      },
      password: {
        type: String,
        required: [true, 'Password area is required'],
        minLength: [4, 'At least 4 characters'],
      },

      blogs: [{
        type: mongoose.Types.ObjectId,
        ref: "Blog",required: true
      }],
      comments: [{
        type: mongoose.Types.ObjectId,
        ref: "Comment",required: true
      }],
  
      }
  );
  

const User = mongoose.model("User", userSchema);
export default User;