import sharp from "sharp";
import cloudinary from "../utils/cloudinary.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

// -----------------------addNewPost Logic-----------------------

export const addNewPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const image = req.file;
    const authorId = req.id;

    if (!image) {
      return res.status(400).json({
        message: "Image required",
        success: false,
      });
    }

    // image optimize
    const optimizedImageBuffer = await sharp(image.buffer)
      .resize({ width: 800, height: 800, fit: "inside" })
      .toFormat("jpeg", { quality: 80 })
      .toBuffer();

    // buffer to datauri
    const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString("base64")}`;

    // cloud upload
    const cloudResponse = await cloudinary.uploader.upload(fileUri);

    // create post in DB
    const post = await Post.create({
      caption,
      image: cloudResponse.secure_url,
      author: authorId,
    });

    const user = await User.findById(authorId);
    if (user) {
      user.posts.push(post._id);
      await user.save();
    }

    await post.populate({ path: "author", select: "-password" });

    return res.status(201).json({
      message: "New post added",
      post,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// -----------------------getAllPost Logic-----------------------

export const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "username profilePicture" })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "author",
          select: "username profilePicture followers following",
        },
      });

    return res.status(200).json({
      posts,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// -----------------------getUserPost Logic-----------------------

export const getUserPost = async (req, res) => {
  try {
    const authorId = req.id;
    const posts = await Post.find({ author: authorId })
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "username,profilePicture" })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "author",
          select: "username profiePicture",
        },
      });

    return res.status(200).json({
      posts,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// -----------------------likePost Logic-----------------------

export const likePost = async (req, res) => {
  try {
    const likeKarneValeKiId = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ message: "Post not found", success: false });

    // like_logic started
    await post.updateOne({ $addToSet: { likes: likeKarneValeKiId } });
    await post.save();

    // implementation of socket.io for real time notification
    const user = await User.findById(likeKarneValeKiId).select("username profilePicture");
    const postOwnerId = post.author.toString();

    if(postOwnerId !== likeKarneValeKiId){
      //emit a notification event
      const notification = {
        type : "like",
        userId : likeKarneValeKiId,
        userDetails : user,
        postId,
        message : "Your post was liked"
      }
      const postOwnerSocketId = getReceiverSocketId(postOwnerId);
      io.to(postOwnerSocketId).emit("notification",notification);
    }

    return res.status(200).json({ message: "Post Liked", success: true });
  } catch (error) {
    console.log(error);
  }
};

// -----------------------disLikePost Logic-----------------------

export const disLikePost = async (req, res) => {
  try {
    const disLikeKarneValeKiId = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ message: "Post not found", success: false });

    // like_logic started
    await post.updateOne({ $pull: { likes: disLikeKarneValeKiId } });
    await post.save();

    // implementation of socket.io for real time notification
    const user = await User.findById(disLikeKarneValeKiId).select("username profilePicture");
    const postOwnerId = post.author.toString();
    
    if(postOwnerId !== disLikeKarneValeKiId){
      //emit a notification event
      const notification = {
        type : "dislike",
        userId : disLikeKarneValeKiId,
        userDetails : user,
        postId,
        message : "Your post was liked"
      }
      const postOwnerSocketId = getReceiverSocketId(postOwnerId);
      io.to(postOwnerSocketId).emit("notification",notification);
    }

    return res.status(200).json({ message: "Post Disliked", success: true });
  } catch (error) {
    console.log(error);
  }
};

// -----------------------addcomment Logic-----------------------

export const addComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const commentKrneValeKiId = req.id;

    const { text } = req.body;
    const post = await Post.findById(postId);

    if (!text)
      return res
        .status(400)
        .json({ message: "text is required", success: false });

    const comment = await Comment.create({
      text,
      author: commentKrneValeKiId,
      post: postId,
    })

    await comment.populate({
      path: "author",
      select: "username profilePicture",
    });

    post.comments.push(comment._id);
    await post.save();

    return res.status(200).json({
      message: "comment added",
      comment,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// -----------------------getCommentOfPost Logic-----------------------

export const getCommentOfPost = async (req, res) => {
  try {
    const postId = req.params.id;

    const comments = await Comment.find({ post: postId }).populate(
      "author",
      "username profilePicture",
    );

    if (!comments)
      return res
        .status(404)
        .json({ message: "No comments found for this post", success: false });

    return res.status(200).json({ success: true, comments });
  } catch (error) {
    console.log(error);
  }
};

// -----------------------deletePost Logic-----------------------

export const deletePost = async (req, res) => {
  try {
    const authorId = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ message: "Post not found", success: false });

    // check if the logged-in user is the owner of the post
    if (post.author.toString() !== authorId)
      return res.status(403).json({ message: "unauthorized" });

    // Delete Post
    await Post.findByIdAndDelete(postId);

    // remove the post Id from the users post
    let user = await User.findById(authorId);
    user.posts = user.posts.filter((id) => id.toString() !== postId);
    await user.save();

    // delete associalted comments
    await Comment.deleteMany({ post: postId });

    return res.status(200).json({
      message: "Post deleted",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// -----------------------bookmarkPost Logic-----------------------

export const bookmarkPost = async (req, res) => {
  try {
    const authorId = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ message: "Post not found", success: false });

    let user = await User.findById(authorId);
    if(user.bookmarks.includes(post._id)){
      // already bookmarked -> remove from the bookmark
      await user.updateOne({$pull: {bookmarks:post._id}});
      await user.save();
      return res.status(200).json({message:"Post removed from bookmark",type:"unsaved",success:true});
    }else{
      // already bookmarked -> remove from the bookmark
      await user.updateOne({$addToSet: {bookmarks:post._id}});
      await user.save();
      return res.status(200).json({message:"Post bookmarked",type:"saved",success:true});
    }
  } catch (error) {
    console.log(error);
  }
};
