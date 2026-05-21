const prisma = require('../prismaClient');

// Get all blogs (public)
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        doctor: {
          select: { name: true, nameAm: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching blogs' });
  }
};

// Get single blog by ID (public)
exports.getBlogById = async (req, res) => {
  try {
    const blogId = parseInt(req.params.id);
    if (isNaN(blogId)) {
      return res.status(400).json({ message: 'Invalid blog ID' });
    }
    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
      include: {
        doctor: {
          select: { name: true, nameAm: true }
        }
      }
    });
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching blog' });
  }
};

// Get all blogs for the logged-in doctor
exports.getDoctorBlogs = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const blogs = await prisma.blog.findMany({
      where: { authorId: doctorId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching blogs' });
  }
};

// Create a new blog post
exports.createBlog = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const { title, titleAm, category, categoryAm, content, contentAm, image, date } = req.body;

    const newBlog = await prisma.blog.create({
      data: {
        title,
        titleAm,
        category,
        categoryAm,
        content,
        contentAm,
        image,
        date,
        authorId: doctorId
      }
    });
    res.status(201).json(newBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating blog' });
  }
};

// Delete a blog post
exports.deleteBlog = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const blogId = parseInt(req.params.id);

    // Verify ownership
    const blog = await prisma.blog.findUnique({ where: { id: blogId } });
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    if (blog.authorId !== doctorId) {
      return res.status(403).json({ message: 'Unauthorized to delete this blog' });
    }

    await prisma.blog.delete({ where: { id: blogId } });
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting blog' });
  }
};
