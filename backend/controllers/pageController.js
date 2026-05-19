const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get all pages schemas (for public site)
const getAllPages = async (req, res) => {
  try {
    const pages = await prisma.page.findMany();
    // Return an object keyed by page id
    const pagesObj = {};
    pages.forEach(p => {
      pagesObj[p.id] = p.content;
    });
    res.json(pagesObj);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching pages' });
  }
};

// Get single page
const getPageById = async (req, res) => {
  try {
    const { id } = req.params;
    const page = await prisma.page.findUnique({ where: { id } });
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.json(page.content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching page' });
  }
};

// Update page content
const updatePage = async (req, res) => {
  try {
    const { id } = req.params;
    const content = req.body; // Full JSON content of the page
    
    // Upsert the page
    const page = await prisma.page.upsert({
      where: { id },
      update: { content },
      create: { id, content }
    });
    
    res.json({ message: 'Page updated successfully', page });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating page' });
  }
};

module.exports = {
  getAllPages,
  getPageById,
  updatePage
};
