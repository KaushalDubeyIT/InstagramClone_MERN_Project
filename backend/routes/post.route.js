import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import {
  addComment,
  addNewPost,
  bookmarkPost,
  deletePost,
  disLikePost,
  getAllPost,
  getCommentOfPost,
  getUserPost,
  likePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/addpost", isAuthenticated, upload.single("image"), addNewPost);
router.get("/all", isAuthenticated, getAllPost);
router.get("/userpost/all", isAuthenticated, getUserPost);
router.get("/:id/like", isAuthenticated, likePost);
router.get("/:id/dislike", isAuthenticated, disLikePost);
router.post("/:id/comment", isAuthenticated, addComment);
router.post("/:id/comment/all", isAuthenticated, getCommentOfPost);
router.post("/delete/:id", isAuthenticated, deletePost);
router.post("/:id/bookmark", isAuthenticated, bookmarkPost);

export default router;
