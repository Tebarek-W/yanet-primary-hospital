const express = require('express');
const router = express.Router();
const { getAllPosts, getPostById, createPost, updatePost, deletePost } = require('../controllers/blogController');

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/', blogController.getAllBlogs);

// Protected routes (apply authMiddleware specifically to these routes)
router.get('/me', authMiddleware, blogController.getDoctorBlogs);
router.post('/', authMiddleware, blogController.createBlog);
router.delete('/:id', authMiddleware, blogController.deleteBlog);

// Public route for single blog (Must be after /me to avoid route shadowing)
router.get('/:id', blogController.getBlogById);

module.exports = router;
