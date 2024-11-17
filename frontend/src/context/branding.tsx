import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import {
  getBrandingDetails,
  updateBrandingDetails,
} from "../services/branding";
import { IBranding } from "../types/branding";

// Define the shape of the context
interface BrandingContextProps {
  branding: IBranding | null; // Replace `any` with a proper Branding type if available
  loading: boolean;
  error: string | null;
  fetchBranding: () => Promise<void>;
  updateBranding: (updates: Partial<IBranding>) => Promise<void>;
}

// Default values for the context
const defaultContext: BrandingContextProps = {
  branding: null,
  loading: true,
  error: null,
  fetchBranding: async () => {},
  updateBranding: async () => {},
};

// Create the context
const BrandingContext = createContext<BrandingContextProps>(defaultContext);

// Provider component
export const BrandingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [branding, setBranding] = useState<IBranding | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch branding details
  const fetchBranding = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBrandingDetails();
      setBranding(data);
    } catch (err: any) {
      setError("Failed to fetch branding details.");
    } finally {
      setLoading(false);
    }
  };

  // Update branding details
  const updateBranding = async (updates: Partial<IBranding>) => {
    setError(null);
    try {
      const updatedBranding = await updateBrandingDetails(updates);
      setBranding(updatedBranding.branding); // Update local state
    } catch (err: any) {
      setError("Failed to update branding details.");
      throw err;
    }
  };

  useEffect(() => {
    fetchBranding();
  }, []);

  return (
    <BrandingContext.Provider
      value={{
        branding,
        loading,
        error,
        fetchBranding,
        updateBranding,
      }}
    >
      {children}
    </BrandingContext.Provider>
  );
};

// Custom hook to use the BrandingContext
export const useBranding = () => useContext(BrandingContext);
