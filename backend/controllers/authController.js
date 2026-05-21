const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../prismaClient');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Optional: Seed the initial admin user if none exists
    const adminCount = await prisma.admin.count();
    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash('123456', 10);
      await prisma.admin.create({
        data: { email: 'admin@yanethospital.com', password: hashedPassword }
      });
    }

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET || 'fallback_secret_key_123',
      { expiresIn: '24h' }
    );

    res.json({ token, user: { email: admin.email, role: admin.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

const staffLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find doctor by email
    const doctor = await prisma.doctor.findFirst({ where: { email } });
    if (!doctor) {
      return res.status(401).json({ message: 'No staff account found with that email.' });
    }

    // Staff accounts use a shared demo password (no hashed password on Doctor model)
    const STAFF_PASSWORD = process.env.STAFF_PASSWORD || 'yanetstaff123';
    if (password !== STAFF_PASSWORD) {
      return res.status(401).json({ message: 'Invalid staff credentials.' });
    }

    const token = jwt.sign(
      { id: doctor.id, email: doctor.email, role: 'staff' },
      process.env.JWT_SECRET || 'fallback_secret_key_123',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: doctor.id,
        email: doctor.email,
        name: doctor.name,
        role: doctor.roleKey,
        specialty: doctor.specialty,
        avatar: doctor.image
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during staff login' });
  }
};

module.exports = {
  login,
  staffLogin
};
