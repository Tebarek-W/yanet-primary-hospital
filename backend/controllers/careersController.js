const prisma = require('../prismaClient');

// ─── Job Vacancies ───────────────────────────────────────────────────────────

const getAllVacancies = async (req, res) => {
  try {
    const vacancies = await prisma.jobVacancy.findMany({ orderBy: { postedDate: 'desc' } });
    res.json(vacancies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching vacancies' });
  }
};

const getVacancyById = async (req, res) => {
  try {
    const { id } = req.params;
    const vacancy = await prisma.jobVacancy.findUnique({ where: { id } });
    if (!vacancy) return res.status(404).json({ message: 'Vacancy not found' });
    res.json(vacancy);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching vacancy' });
  }
};

const createVacancy = async (req, res) => {
  try {
    const vacancy = await prisma.jobVacancy.create({ data: req.body });
    res.status(201).json(vacancy);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error creating vacancy' });
  }
};

const updateVacancy = async (req, res) => {
  try {
    const { id } = req.params;
    const vacancy = await prisma.jobVacancy.update({ where: { id }, data: req.body });
    res.json(vacancy);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating vacancy' });
  }
};

const deleteVacancy = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.jobVacancy.delete({ where: { id } });
    res.json({ message: 'Vacancy deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error deleting vacancy' });
  }
};

// ─── Internship Programs ─────────────────────────────────────────────────────

const getAllInternships = async (req, res) => {
  try {
    const programs = await prisma.internshipProgram.findMany({ orderBy: { id: 'asc' } });
    res.json(programs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching internships' });
  }
};

const createInternship = async (req, res) => {
  try {
    const program = await prisma.internshipProgram.create({ data: req.body });
    res.status(201).json(program);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error creating internship' });
  }
};

const updateInternship = async (req, res) => {
  try {
    const { id } = req.params;
    const program = await prisma.internshipProgram.update({ where: { id }, data: req.body });
    res.json(program);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating internship' });
  }
};

const deleteInternship = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.internshipProgram.delete({ where: { id } });
    res.json({ message: 'Internship deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error deleting internship' });
  }
};

module.exports = {
  getAllVacancies, getVacancyById, createVacancy, updateVacancy, deleteVacancy,
  getAllInternships, createInternship, updateInternship, deleteInternship,
};
