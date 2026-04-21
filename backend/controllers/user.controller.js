import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

// -------------Register Logic---------------------

export const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !email || !password) {
      return res.status(401).json({
        message: "Something is missing, please check!",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "Try different email",
        success: false,
      });
    }
    // Hashedpassword
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// -----------------------Login Logic-----------------------

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "Something is missing, please check!",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Incorrect email",
        success: false,
      });
    }
    // Password Check
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Incorrect password",
        success: false,
      });
    }
    // Token generation
    user={
        _id:user._id,
        username:user.username,
        profilePicture:user.profilePicture,
        bio:user.bio,
        followers:user.followers,
        following:user.following,
        posts:user.posts
    }
    const token =await jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:"1d"});
    return res.cookie("token",token,{httpOnly:true,sameSite:"strict",maxAge:1*24*60*60*1000}).json({
        message:`Welcome back ${user.username}`,
        success:true,
        user
    })
  } catch (error) {
    console.log(error);
  }
};

// -----------------------Logout Logic-----------------------

export const logout=async(_,res) => {
    try {
        return res.cookie("token","",{maxAge:0}).json({
            message:"Logged our successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
};

// -----------------------getProfile Logic-----------------------

export const getProfile=async(req,res) => {
    try {
      const userId=req.params.id;
      let user = await User.findById(userId);
      return res.status(200).json({
        user,
        success:true
      })
    } catch (error) {
        console.log(error);
    }
};

// -----------------------editProfile Logic-----------------------

export const editProfile=async(req,res) => {
    try {
      const userId=req.id;
      const {bio,gender}=req.body;
      const profilePicture=req.file;
      let cloudResponse;

      if(profilePicture){
        const fileUri = getDataUri(profilePicture);
        await cloudinary.uploader.upload(fileUri);

        const user=await User.findById(userId);
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:true
            });        
        }
      }
    } catch (error) {
        console.log(error);
    }
};