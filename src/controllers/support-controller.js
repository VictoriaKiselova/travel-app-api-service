import nodemailer from 'nodemailer';

export const supportController = async (req, res, next) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Підтримка" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject: 'Нове повідомлення до служби підтримки',
      text: message,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Send error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};
