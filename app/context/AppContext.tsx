"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import type { Transaction } from "../types";

type Role = "viewer" | "admin";

type AppContextType = {
  transactions: Transaction[];
  role: Role;
  setRole: (role: Role) => void;
  addTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: number) => void;
  updateTransaction: (updated: Transaction) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("transactions");
      if (saved) return JSON.parse(saved);
    }

    return [
      { id: 1, date: "2026-04-01", amount: 50000, category: "Salary", type: "income" },
      { id: 2, date: "2026-04-02", amount: 5000, category: "Food", type: "expense" },
    ];
  });

  const [role, setRole] = useState<Role>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("role");
      if (saved === "admin" || saved === "viewer") return saved;
    }
    return "viewer";
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  const deleteTransaction = (id: number) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTransaction = (updated: Transaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  };

  return (
    <AppContext.Provider
      value={{ transactions, role, setRole, addTransaction, deleteTransaction, updateTransaction }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}