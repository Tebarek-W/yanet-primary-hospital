const prisma = require('../prismaClient');

// Get all branches
exports.getAllBranches = async (req, res) => {
  try {
    const branches = await prisma.branch.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(branches);
  } catch (error) {
    console.error("Error fetching branches:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get single branch by slug
exports.getBranchBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const branch = await prisma.branch.findUnique({
      where: { slug }
    });
    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }
    res.json(branch);
  } catch (error) {
    console.error("Error fetching branch:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new branch
exports.createBranch = async (req, res) => {
  const {
    slug,
    name,
    nameAm,
    city,
    cityAm,
    address,
    addressAm,
    phone,
    email,
    mapEmbedUrl,
    workingHours,
    serviceSlugs,
    doctorIds,
    image,
    featuredServices,
    featuredServicesAm,
    theme
  } = req.body;

  if (!slug || !name || !nameAm) {
    return res.status(400).json({ message: "Slug, Name, and Name (Amharic) are required" });
  }

  try {
    // Check if slug already exists
    const existing = await prisma.branch.findUnique({ where: { slug } });
    if (existing) {
      return res.status(400).json({ message: "A branch with this slug already exists" });
    }

    const branch = await prisma.branch.create({
      data: {
        slug,
        name,
        nameAm,
        city: city || "",
        cityAm: cityAm || "",
        address: address || "",
        addressAm: addressAm || "",
        phone: phone || "",
        email: email || "",
        mapEmbedUrl: mapEmbedUrl || "",
        workingHours: workingHours || {},
        serviceSlugs: serviceSlugs || [],
        doctorIds: doctorIds || [],
        image: image || "",
        featuredServices: featuredServices || [],
        featuredServicesAm: featuredServicesAm || [],
        theme: theme || {}
      }
    });

    res.status(201).json(branch);
  } catch (error) {
    console.error("Error creating branch:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update an existing branch
exports.updateBranch = async (req, res) => {
  const { slug } = req.params;
  const updateData = req.body;

  try {
    const existing = await prisma.branch.findUnique({ where: { slug } });
    if (!existing) {
      return res.status(404).json({ message: "Branch not found" });
    }

    // Don't allow changing slug directly via update if it's the ID, or handle it carefully
    // Prisma slug is the primary key. If slug changes, we need to delete and recreate, but usually slug editing is disabled.
    delete updateData.slug; // ensure primary key is not mutated

    const updated = await prisma.branch.update({
      where: { slug },
      data: updateData
    });

    res.json(updated);
  } catch (error) {
    console.error("Error updating branch:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a branch
exports.deleteBranch = async (req, res) => {
  const { slug } = req.params;
  try {
    const existing = await prisma.branch.findUnique({ where: { slug } });
    if (!existing) {
      return res.status(404).json({ message: "Branch not found" });
    }

    await prisma.branch.delete({ where: { slug } });
    res.json({ message: "Branch deleted successfully" });
  } catch (error) {
    console.error("Error deleting branch:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
