"use client";

import { useState } from "react";
import { useApp } from "../context/AppContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const selectClassName =
  "h-8 rounded-lg border border-input bg-background px-2.5 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export default function AddTransaction() {
  const { addTransaction, role } = useApp();

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [date, setDate] = useState("");

  if (role !== "admin") return null;

  const handleAdd = () => {
    if (!category || !amount || !date) return;

    addTransaction({
      id: Date.now(),
      date,
      amount: Number(amount),
      category,
      type,
    });

    // reset fields
    setAmount("");
    setCategory("");
    setDate("");
  };

  return (
    <div className="rounded-xl border bg-card p-3 text-card-foreground shadow-sm sm:p-4">
      <div className="space-y-4">
        <h2 className="text-base sm:text-lg font-semibold">Add Transaction</h2>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          <Input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <Input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value as "income" | "expense")
            }
            className={selectClassName}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <Button onClick={handleAdd} className="w-full sm:w-auto">
          Add
        </Button>
      </div>
    </div>
  );
}
