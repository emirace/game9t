import { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { AuthenticatedRequest } from '../middlewares/auth';
import Token from '../models/token';
import { JWT_SECRET, frontendUrl } from '../config/env';
import { sendEmail } from '../utils/email';

const generateToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

export const registerUser = async (req: Request, res: Response) => {
  console.log(req.body);
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      res
        .status(400)
        .json({ message: 'User with this username already exists' });
      return;
    }

    const user = new User({
      username,
      email,
      password,
    });

    await user.save();

    if (user) {
      res.status(201).json({
        message: 'Registration successfully',
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Check for user by username
    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      res.json({
        token: generateToken(user._id as string),
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Generate a token
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenHash = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Store token in the DB (optionally you can create a separate Token model for better organization)
    await Token.create({
      userId: user._id,
      token: resetTokenHash,
      type: 'resetPassword',
      expiresAt: Date.now() + 10 * 60 * 1000, // 10-minute expiration
    });

    // Send reset email with the token
    const resetUrl = `${frontendUrl}/auth/resetpassword/${resetToken}`;

    const message = `You requested a password reset. Click the link below to reset your password:\n\n${resetUrl}`;
    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      text: message,
    });

    res.status(200).json({ message: 'Email sent with reset instructions' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;

  // Hash the token to find the token in the database
  const resetTokenHash = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  try {
    const storedToken = await Token.findOne({
      token: resetTokenHash,
      type: 'resetPassword',
      expiresAt: { $gt: Date.now() },
    });
    if (!storedToken) {
      res.status(400).json({ message: 'Invalid or expired token' });
      return;
    }

    // Find the user by their ID
    const user = await User.findById(storedToken.userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    user.password = await password;

    // Save the new password and remove the token
    await user.save();
    await Token.deleteOne({ token: resetTokenHash });

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const sendVerificationEmail = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const userId = req.user!.id;
  const user = await User.findById(userId);

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  const verificationToken = crypto.randomBytes(20).toString('hex');
  const verificationTokenHash = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');

  await Token.create({
    userId: user._id,
    token: verificationTokenHash,
    type: 'verifyEmail',
    expiresAt: Date.now() + 10 * 60 * 1000, // 10-minute expiration
  });

  const verificationUrl = `${req.protocol}://${req.get('host')}/api/auths/verifyemail/${verificationToken}`;

  const message = `Click the link to verify your email: \n\n${verificationUrl}`;
  console.log(message);
  await sendEmail({
    to: user.email,
    subject: 'Email Verification',
    text: message,
  });

  res.status(200).json({ message: 'Verification email sent' });
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.params;

  const verificationTokenHash = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  try {
    const storedToken = await Token.findOne({
      token: verificationTokenHash,
      type: 'verifyEmail',
      expiresAt: { $gt: Date.now() },
    });
    if (!storedToken) {
      res.status(400).send(`
        <html>
          <body style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f8d7da;">
            <div style="text-align: center;">
              <h1 style="color: red;">Invalid or expired token</h1>
            </div>
          </body>
        </html>
      `);
      return;
    }

    const user = await User.findById(storedToken.userId);
    if (!user) {
      res.status(404).send(`
        <html>
          <body style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f8d7da;">
            <div style="text-align: center;">
              <h1 style="color: red;">User not found</h1>
            </div>
          </body>
        </html>
      `);
      return;
    }

    user.verified = true;
    await user.save();
    await Token.deleteOne({ token: verificationTokenHash });

    res.status(200).send(`
      <html>
        <body style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #d4edda;">
          <div style="text-align: center;">
            <h1 style="color: green;">Email verified successfully!</h1>
            <a href="${frontendUrl}/login" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">
              Continue to Login
            </a>
          </div>
        </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send(`
      <html>
        <body style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f8d7da;">
          <div style="text-align: center;">
            <h1 style="color: red;">Server error. Please try again later.</h1>
          </div>
        </body>
      </html>
    `);
  }
};

export const sendContactEmail = async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  // Validate input fields
  if (!name || !email || !message) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  try {
    await sendEmail({
      subject: `Contact Us Form`,
      text: `You received a message from ${name} (${email}):\n\n${message}`,

      html: `
    <h2>Contact Us Form</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `,
    });

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res
      .status(500)
      .json({ error: 'Failed to send email. Please try again later.' });
  }
};
