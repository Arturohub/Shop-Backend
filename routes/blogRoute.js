const express = require('express');
const router = express.Router();
const Blog = require("../models/blogModel");
const { getPosts, getPost, editPost, deletePost, createPost } = require("../controllers/blogController");

router.get("/", getPosts);
router.get("/:id", getPost);
router.put("/:id", editPost);
router.post("/", createPost);
router.delete("/:id", deletePost);

module.exports = router;
