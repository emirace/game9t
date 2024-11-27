import nodemailer from 'nodemailer';
import { pass, user } from '../config/env';

// Create a transporter using Gmail service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user,
    pass,
  },
});
// Function to send verification email
export const sendEmail = async ({
  to,
  subject,
  text,
  html,
}: {
  to?: string;
  text: string;
  subject: string;
  html?: string;
}) => {
  const mailOptions = {
    from: user,
    to: to ? to : user,
    subject,
    text,
    html,
  };

  await transporter.sendMail(mailOptions);
};
