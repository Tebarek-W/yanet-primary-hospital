const prisma = require('../prismaClient');

// Get all message channels for the logged-in doctor
exports.getDoctorChannels = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const channels = await prisma.messageChannel.findMany({
      where: { doctorId },
      include: {
        history: {
          orderBy: { createdAt: 'asc' }
        }
      },
      orderBy: { updatedAt: 'desc' }
    });
    res.json(channels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching message channels' });
  }
};

// Send a message in a specific channel
exports.sendMessage = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const { channelId, text, time, sender } = req.body;

    // Verify channel belongs to doctor
    const channel = await prisma.messageChannel.findUnique({
      where: { id: parseInt(channelId) }
    });

    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }
    
    if (channel.doctorId !== doctorId) {
      return res.status(403).json({ message: 'Unauthorized to send message in this channel' });
    }

    const newMessage = await prisma.chatMessage.create({
      data: {
        channelId: parseInt(channelId),
        sender: sender || 'doctor',
        text,
        time
      }
    });

    // Update channel's updatedAt and unread status (if patient sent)
    await prisma.messageChannel.update({
      where: { id: parseInt(channelId) },
      data: { 
        updatedAt: new Date(),
        unread: sender === 'patient'
      }
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending message' });
  }
};
