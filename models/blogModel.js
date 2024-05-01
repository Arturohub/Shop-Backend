const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
    {
        title: {
            type: String, 
            required: true,
            unique: true
        },
        post: { 
            type: String, 
            required: true,
        },
        category: {
            type: String, 
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now
          },

        updatedAt: {
            type: Date,
            default: Date.now
          }
    },

);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;