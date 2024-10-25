import React, { createContext, useContext, useState, useEffect } from "react";
import {
  fetchAllTransaction,
  fetchUserTransation,
} from "../services/transaction";
import { useUser } from "./user";

interface ITransaction {
  _id: string;
  user: string;
  amount: number;
  status: "Pending" | "Completed" | "Failed" | "Won" | "Loss";
  type: "Deposit" | "Withdrawal" | "Bet";
  paymentMethod: "Credit Card" | "Bank Transfer" | "Crypto";
  createdAt: string;
}

interface TransactionContextType {
  userTransactions: ITransaction[];
  allTransactions: ITransaction[];
  fetchUserTransactions: () => Promise<void>;
  fetchAllTransactions: () => Promise<void>;
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
  const [allTransactions, setAllTransactions] = useState<ITransaction[]>([]);

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

  // Function to fetch all transactions
  const fetchAllTransactions = async () => {
    try {
      const response = await fetchAllTransaction();
      setAllTransactions(response);
    } catch (error) {
      console.error("Failed to fetch all transactions:", error);
      setAllTransactions([]);
    }
  };

  useEffect(() => {
    fetchUserTransactions();
  }, [user]);

  useEffect(() => {
    fetchAllTransactions();
  }, [user]);

  return (
    <TransactionContext.Provider
      value={{
        userTransactions,
        allTransactions,
        fetchUserTransactions,
        fetchAllTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
