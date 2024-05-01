const Blog = require("../models/blogModel");
const asyncHandler = require("express-async-handler");

// GET ALL BLOG POSTS
const getPosts = asyncHandler(async (req, res) => {
    try {
        const posts = await Blog.find({});
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET ONE SPECIFIC BLOG POST
const getPost = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Blog.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// EDIT BLOG POST
const editPost = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Blog.findByIdAndUpdate(id, req.body);
        if (!post) {
           res.status(404).json({ message: `There are no blog posts with that ID: ${id}` });
           return;
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE BLOG POST
const deletePost = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Blog.findByIdAndDelete(id);
        if (!post) {
            res.status(404).json({ message: `There are no blog posts with that ID: ${id}` });
            return;
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// CREATE A NEW BLOG POST
const createPost = asyncHandler(async (req, res) => {
    try {
        const post = await Blog.create(req.body);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = { getPosts, getPost, editPost, deletePost, createPost };
