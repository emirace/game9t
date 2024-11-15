import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchUserTransation } from "../services/transaction";
import { ITransaction } from "../types/transaction";
import { useUser } from "./user";

interface TransactionContextType {
  userTransactions: ITransaction[];
  fetchUserTransactions: () => Promise<void>;
}

// Create the ITransaction context
const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

// Create a custom hook to use the ITransaction context
export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error("useTransaction must be used within a TransactionProvider");
  }
  return context;
};

// Create a provider component
export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const [userTransactions, setUserTransactions] = useState<ITransaction[]>([]);

  // Function to fetch user transactions
  const fetchUserTransactions = async () => {
    try {
      const response = await fetchUserTransation();
      setUserTransactions(response);
    } catch (error) {
      console.error("Failed to fetch user transactions:", error);
      setUserTransactions([]);
    }
  };

  useEffect(() => {
    fetchUserTransactions();
  }, [user]);

  return (
    <TransactionContext.Provider
      value={{
        userTransactions,
        fetchUserTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
