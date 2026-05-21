const prisma = require('../prismaClient');

const getAllServices = async (req, res) => {
  try {
    const services = await prisma.service.findMany({ orderBy: { title: 'asc' } });
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching services' });
  }
};

const getServiceBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const service = await prisma.service.findUnique({ where: { slug } });
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching service' });
  }
};

const createService = async (req, res) => {
  try {
    const service = await prisma.service.create({ data: req.body });
    res.status(201).json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error creating service' });
  }
};

const updateService = async (req, res) => {
  try {
    const { slug } = req.params;
    const service = await prisma.service.update({ where: { slug }, data: req.body });
    res.json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating service' });
  }
};

const deleteService = async (req, res) => {
  try {
    const { slug } = req.params;
    await prisma.service.delete({ where: { slug } });
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error deleting service' });
  }
};

module.exports = { getAllServices, getServiceBySlug, createService, updateService, deleteService };
