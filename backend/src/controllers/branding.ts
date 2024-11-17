import { Request, Response } from 'express';
import Branding from '../models/branding';

export const getBrandingDetails = async (req: Request, res: Response) => {
  try {
    // Try fetching the branding from the database
    const branding = await Branding.findOne().lean();

    // If no branding is found, set default branding values
    if (!branding) {
      const defaultBranding = {
        name: 'Game9t',
        color: '#03346E', // Example default color
        logo: '/images/logo.png', // Example default logo
        favicon: '/images/favicon.ico', // Example default favicon
        font: {
          family: 'Arial, sans-serif', // Default font family
          size: 14, // Default font size
        },
        aboutUs: `Website offers an exciting platform where players can compete in
          real-time across a variety of games like Chess, Connect Four, and
          Tic Tac Toe. Featuring both single-player and multiplayer modes,
          users can challenge opponents, place bets, and win real money in a
          secure and seamless environment.`,
        socialMedia: {
          facebook: '',
          twitter: '',
          instagram: '',
        },
        language: 'en',
        timezone: 'UTC',
        copyright: 'Copyright@. Online Gaming.com, All Rights Reserved',
        quickLinks: [],
        legalPageLink: '/legal',
      };

      res.status(200).json(defaultBranding);
      return;
    }

    // Exclude sensitive details (e.g., admin account information)
    const {
      adminSettings: { adminAccount, ...safeAdminSettings },
      ...safeBrandingDetails
    } = branding;

    // Send the branding details excluding sensitive data
    res.status(200).json({
      ...safeBrandingDetails,
      adminSettings: safeAdminSettings,
    });
  } catch (error) {
    console.error('Error fetching branding details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateBrandingDetails = async (req: Request, res: Response) => {
  try {
    // Extract branding updates from request body
    const updates = req.body;

    console.log(updates);

    // Find the existing branding document or create a new one if not found
    let branding = await Branding.findOne();
    if (!branding) {
      branding = new Branding(updates);
    } else {
      // Update the existing branding document
      Object.assign(branding, updates);
    }

    console.log(branding);

    // Save the branding document
    await branding.save();

    res.status(200).json({
      message: branding.isNew
        ? 'Branding details created successfully'
        : 'Branding details updated successfully',
      branding,
    });
  } catch (error) {
    console.error('Error updating branding details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
