import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchUserBalance, fundWallet } from "../services/wallet";
import { useUser } from "./user";
import { useTransaction } from "./transaction";

// Define the context type
interface WalletContextType {
  balance: number;
  loading: boolean;
  fetchBalance: () => Promise<void>;
  fund: (amount: string, reference: string) => Promise<void>;
}

// Create the Wallet context
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Create a provider component
export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const { fetchUserTransactions } = useTransaction();
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // Function to fetch the user's balance
  const fetchBalance = async () => {
    try {
      const response = await fetchUserBalance();
      setBalance(response.balance);
    } catch (error) {
      setBalance(0);
      throw error;
    }
  };

  const fund = async (amount: string, reference: string) => {
    try {
      await fundWallet(amount, reference);
      fetchBalance();
      fetchUserTransactions();
    } catch (error) {
      throw error;
    }
  };

  // Fetch balance on mount
  useEffect(() => {
    fetchBalance()
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }, [user]);

  return (
    <WalletContext.Provider value={{ balance, loading, fetchBalance, fund }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
