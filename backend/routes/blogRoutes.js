const express = require('express');
const router = express.Router();
const { getAllPosts, getPostById, createPost, updatePost, deletePost } = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/', getAllPosts);

// Staff: get only posts authored by the logged-in doctor
router.get('/me', authMiddleware, async (req, res) => {
  const prisma = require('../prismaClient');
  try {
    const posts = await prisma.blogPost.findMany({
      where: { authorId: req.user.id.toString() },
      orderBy: { createdAt: 'desc' }
    });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching your posts' });
  }
});

// Must come after /me to avoid route shadowing
router.get('/:id', getPostById);

// Create / update / delete (used by both admin and staff)
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;
