const prisma = require('../prismaClient');
const bcrypt = require('bcryptjs');

// Get all doctors
exports.getAllDoctors = async (req, res) => {
  const { branch } = req.query;
  try {
    const doctors = await prisma.doctor.findMany({
      orderBy: { createdAt: 'desc' }
    });

    // If branch filter is provided, filter the doctors manually since branchSlugs is a JSON array
    if (branch) {
      const filtered = doctors.filter(doc => {
        const slugs = doc.branchSlugs || [];
        return slugs.includes(branch);
      });
      return res.json(filtered);
    }

    // Exclude password from the response
    const safeDoctors = doctors.map(doc => {
      const { password, ...rest } = doc;
      return rest;
    });

    res.json(safeDoctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get single doctor by id
exports.getDoctorById = async (req, res) => {
  const { id } = req.params;
  try {
    const doctor = await prisma.doctor.findUnique({
      where: { id: parseInt(id) }
    });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    const { password, ...safeDoctor } = doctor;
    res.json(safeDoctor);
  } catch (error) {
    console.error("Error fetching doctor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new doctor
exports.createDoctor = async (req, res) => {
  const {
    name, nameAm, roleKey, specialty, image, desc, descAm,
    email, phone, password, location, education, educationAm,
    experience, experienceAm, skills, skillsAm, biography, biographyAm,
    branchSlugs, isActive
  } = req.body;

  if (!name || !email || !specialty) {
    return res.status(400).json({ message: "Name, email, and specialty are required" });
  }

  try {
    // Check if email already exists
    const existing = await prisma.doctor.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "A doctor with this email already exists" });
    }

    // Use default password if not provided
    const plainPassword = password || "yanetstaff123";
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const doctor = await prisma.doctor.create({
      data: {
        name,
        nameAm: nameAm || "",
        roleKey: roleKey || "doctor_team.roles.general",
        specialty,
        image: image || "",
        desc: desc || "",
        descAm: descAm || "",
        email,
        phone: phone || "",
        password: hashedPassword,
        location: location || "Addis Ababa, Ethiopia",
        education: education || [],
        educationAm: educationAm || [],
        experience: experience || [],
        experienceAm: experienceAm || [],
        skills: skills || [],
        skillsAm: skillsAm || [],
        biography: biography || "",
        biographyAm: biographyAm || "",
        branchSlugs: branchSlugs || [],
        isActive: isActive !== undefined ? isActive : true
      }
    });

    // Optionally update associated branches' doctorIds (simplified for now to keep it consistent)
    // Here we could find the branches and append this doctor's ID to their doctorIds JSON.
    // For now, we will rely on frontend/backend logic to query doctors by branchSlugs.

    const { password: pwd, ...safeDoctor } = doctor;
    res.status(201).json(safeDoctor);
  } catch (error) {
    console.error("Error creating doctor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update an existing doctor
exports.updateDoctor = async (req, res) => {
  const { id } = req.params;
  const updateData = { ...req.body };

  try {
    const existing = await prisma.doctor.findUnique({ where: { id: parseInt(id) } });
    if (!existing) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // If password is being updated, hash it
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updated = await prisma.doctor.update({
      where: { id: parseInt(id) },
      data: updateData
    });

    const { password: pwd, ...safeDoctor } = updated;
    res.json(safeDoctor);
  } catch (error) {
    console.error("Error updating doctor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a doctor
exports.deleteDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    const existing = await prisma.doctor.findUnique({ where: { id: parseInt(id) } });
    if (!existing) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    await prisma.doctor.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Doctor deleted successfully" });
  } catch (error) {
    console.error("Error deleting doctor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
