import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for the Branding document
export interface IBranding extends Document {
  name: string; // Brand name
  color: string; // Primary brand color (hex code)
  logo: string; // URL or path to the logo
  favicon: string; // URL or path to the favicon
  font: {
    family: string; // Font family
    size: string; // Font size (e.g., "16px", "1rem")
  };
  language: string; // Default language (e.g., "en-US")
  timezone: string; // Default timezone (e.g., "UTC", "America/New_York")
  aboutUs: string; // About us description
  socialMedia: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  copyright: string; // Copyright text
  quickLinks: string; // Array of quick links with label and URL
  legalPages: string; // Legal page links

  // Admin Settings
  adminSettings: {
    paymentGateway: string; // Payment gateway name (e.g., "Stripe", "PayPal")
    currency: string; // Default currency (e.g., "USD", "EUR")
    dailyTransactionLimit: string; // Maximum transactions per day
    maximumUsers: string; // Maximum number of users allowed
    defaultUserRole: string; // Default role for new users (e.g., "user")
    notifications: {
      enableEmail: boolean; // Enable email notifications
      enableSMS: boolean; // Enable SMS notifications
    };
    liveChat: {
      enabled: boolean; // Enable live chat
      link?: string; // Live chat link
    };
    support: {
      email: string; // Support email address
      phone: string; // Support phone number
    };
    adminAccount: {
      email: string; // Admin email address
      password: string; // Hashed admin password
    };
    userVerification: string;
  };
  predefinedBets: string[];
  widgetBlocks: string[];
}

// Create the schema for the Branding model
const BrandingSchema: Schema = new Schema<IBranding>({
  name: { type: String, default: 'Game9t' },
  color: { type: String, default: '#03346E' }, // Default to black
  logo: { type: String, default: '/images/logo.png' }, // Empty string as default
  favicon: { type: String, default: '/images/favicon' }, // Empty string as default
  font: {
    family: { type: String, default: 'sans-serif' }, // Default to sans-serif
    size: { type: String, default: '16px' }, // Default font size
  },
  language: { type: String, default: 'en-US' }, // Default language
  timezone: { type: String, default: 'UTC' }, // Default timezone
  aboutUs: { type: String, default: '' }, // Default empty
  socialMedia: {
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' },
    instagram: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    youtube: { type: String, default: '' },
  },
  copyright: {
    type: String,
    default: 'Copyright@. Online Gaming.com, All Rights Reserved',
  },
  quickLinks: { type: String },
  legalPages: { type: String, default: '' },
  adminSettings: {
    paymentGateway: { type: String, default: 'Paystack' },
    currency: { type: String, default: 'NGN' },
    dailyTransactionLimit: { type: String, default: '1000' }, // Default limit
    maximumUsers: { type: String, default: '100000' }, // Default maximum users
    defaultUserRole: { type: String, default: 'player' }, // Default role
    notifications: {
      enableEmail: { type: Boolean, default: true },
      enableSMS: { type: Boolean, default: false },
    },
    liveChat: {
      enabled: { type: Boolean, default: true },
      link: { type: String, default: '' }, // Optional
    },
    support: {
      email: { type: String },
      phone: { type: String },
    },
    adminAccount: {
      email: { type: String },
      password: { type: String }, // Store as hashed password
    },
    userVerification: { type: String },
  },
  predefinedBets: [{ type: String }],
  widgetBlocks: [{ type: String }],
});

// Export the Branding model
const Branding = mongoose.model<IBranding>('Branding', BrandingSchema);
export default Branding;
