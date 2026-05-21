const prisma = require('../prismaClient');

const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching blog posts' });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await prisma.blogPost.findUnique({ where: { id } });
    if (!post) return res.status(404).json({ message: 'Blog post not found' });
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching blog post' });
  }
};

const createPost = async (req, res) => {
  try {
    const post = await prisma.blogPost.create({ data: req.body });
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error creating blog post' });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await prisma.blogPost.update({ where: { id }, data: req.body });
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating blog post' });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.blogPost.delete({ where: { id } });
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error deleting blog post' });
  }
};

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };
