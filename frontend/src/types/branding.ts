export interface IBranding {
  name: string; // Brand name
  color: string; // Primary brand color (hex code)
  logo: string; // URL or path to the logo
  favicon: string; // URL or path to the favicon
  font: {
    family: string; // Font family
    size: string; // Font size (e.g., "16px", "1rem")
    headingStyle: string;
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
  legalPages: string;

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
      email: string;
    };
    userVerification: string;
  };
  predefinedBets: string[];
  widgetBlocks: string[];
}
