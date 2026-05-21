const prisma = require('./prismaClient');

async function seedChannels() {
  const doctors = await prisma.doctor.findMany();
  for (const doc of doctors) {
    // Check if channels exist
    const existing = await prisma.messageChannel.count({ where: { doctorId: doc.id } });
    if (existing === 0) {
      await prisma.messageChannel.create({
        data: {
          patientName: 'Abebe Kebede',
          age: 34,
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
          symptoms: 'Chronic Fatigue',
          unread: false,
          doctorId: doc.id,
          history: {
            create: [
              { sender: 'patient', text: 'Hello Doctor, I have been feeling very tired lately.', time: '09:00 AM' }
            ]
          }
        }
      });
      await prisma.messageChannel.create({
        data: {
          patientName: 'Semere Tadesse',
          age: 58,
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
          symptoms: 'Chest Palpitations',
          unread: true,
          doctorId: doc.id,
          history: {
            create: [
              { sender: 'patient', text: 'Doctor, I observed a brief racing pulse yesterday afternoon.', time: 'Yesterday' }
            ]
          }
        }
      });
    }
  }
  console.log('Seeded channels successfully.');
}

seedChannels().catch(console.error).finally(() => prisma.$disconnect());
