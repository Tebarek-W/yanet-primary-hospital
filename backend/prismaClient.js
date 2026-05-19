require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');

// Use DATABASE_URL from environment or fallback
const databaseUrl = process.env.DATABASE_URL || "mysql://root:root@127.0.0.1:3309/yanet_db";

// PrismaMariaDb requires mariadb:// protocol
const mariadbUrl = databaseUrl.replace(/^mysql:\/\//, 'mariadb://');

const adapter = new PrismaMariaDb(mariadbUrl);
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
