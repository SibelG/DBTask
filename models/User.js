import mongoose from "mongoose";
import validator from 'validator';

const { Schema } = mongoose;


const userSchema = new Schema(
    {
      name: {
        type: String,
        required: [true, 'Username area is required'],
        validate: [validator.isAlphanumeric, 'Only Alphanumeric characters'],
       
      },
      email: {
        type: String,
        required: [true, 'Email area is required'],
        unique: true,
        validate: [validator.isEmail, 'Valid email is required'],
        
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