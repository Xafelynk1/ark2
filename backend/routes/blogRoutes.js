const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Blog Management
router.get('/', blogController.getAllBlogs); // Get all blogs
router.get('/:id', blogController.getBlog); // Get a specific blog
router.post('/', blogController.createBlog); // Create a new blog
router.put('/:id', blogController.updateBlog); // Update a blog
router.delete('/:id', blogController.deleteBlog); // Delete a blog

module.exports = router;
