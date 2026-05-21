require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes    = require('./routes/authRoutes');
const pageRoutes    = require('./routes/pageRoutes');
const branchRoutes  = require('./routes/branchRoutes');
const doctorRoutes  = require('./routes/doctorRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const blogRoutes    = require('./routes/blogRoutes');
const careersRoutes = require('./routes/careersRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth',     authRoutes);
app.use('/api/pages',    pageRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/doctors',  doctorRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/blog',     blogRoutes);
app.use('/api/careers',  careersRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('Yanet CMS API is running (Prisma + MySQL)');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
