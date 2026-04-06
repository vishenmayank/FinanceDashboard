"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { useApp } from "../context/AppContext";
import type { Transaction } from "../types";
import { Button } from "./ui/button";

export default function TransactionTable() {
  const { transactions, role, deleteTransaction, updateTransaction } = useApp();

  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Transaction | null>(null);

  const filtered: Transaction[] = transactions
    .filter((t) =>
      t.category.toLowerCase().includes(search.toLowerCase())
    )
    .sort(
      (a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );

  const startEdit = (t: Transaction) => {
    setEditingId(t.id);
    setEditData(t);
  };

  const saveEdit = () => {
    if (editData) {
      updateTransaction(editData);
      setEditingId(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Transactions</h2>
        <Input
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
      </div>

      <table className="w-full text-sm border-collapse">
  <thead>
    <tr className="bg-muted text-left">
      <th className="p-3 w-[20%]">Date</th>
      <th className="p-3 w-[25%]">Category</th>
      <th className="p-3 w-[20%] text-right">Amount</th>
      <th className="p-3 w-[15%]">Type</th>
      {role === "admin" && (
        <th className="p-3 w-[20%] text-center">Actions</th>
      )}
    </tr>
  </thead>

  <tbody>
    {filtered.map((t) => (
      <tr key={t.id} className="border-t hover:bg-muted/50">

        {/* DATE */}
        <td className="p-3 align-middle">
          {editingId === t.id ? (
            <input
              type="date"
              value={editData?.date}
              onChange={(e) =>
                setEditData({ ...editData!, date: e.target.value })
              }
              className="border rounded px-2 py-1"
            />
          ) : (
            t.date
          )}
        </td>

        {/* CATEGORY */}
        <td className="p-3 align-middle">
          {editingId === t.id ? (
            <input
              value={editData?.category}
              onChange={(e) =>
                setEditData({ ...editData!, category: e.target.value })
              }
              className="border rounded px-2 py-1 w-full"
            />
          ) : (
            t.category
          )}
        </td>

        {/* AMOUNT */}
        <td className="p-3 text-right font-medium align-middle">
          {editingId === t.id ? (
            <input
              value={editData?.amount}
              onChange={(e) =>
                setEditData({
                  ...editData!,
                  amount: Number(e.target.value),
                })
              }
              className="border rounded px-2 py-1 w-full text-right"
            />
          ) : (
            `₹ ${t.amount}`
          )}
        </td>

        {/* TYPE */}
        <td className="p-3 align-middle">
          {editingId === t.id ? (
            <select
              value={editData?.type}
              onChange={(e) =>
                setEditData({
                  ...editData!,
                  type: e.target.value as "income" | "expense",
                })
              }
              className="border rounded px-2 py-1"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          ) : (
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                t.type === "income"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {t.type}
            </span>
          )}
        </td>

        {/* ACTIONS */}
        {role === "admin" && (
          <td className="p-3 text-center align-middle space-x-2">
            {editingId === t.id ? (
              <button
                onClick={saveEdit}
                className="bg-black text-white px-3 py-1 rounded"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => startEdit(t)}
                className="bg-black text-white px-3 py-1 rounded"
              >
                Edit
              </button>
            )}

            <button
              onClick={() => deleteTransaction(t.id)}
              className="bg-red-100 text-red-600 px-3 py-1 rounded"
            >
              Delete
            </button>
          </td>
        )}
      </tr>
    ))}
  </tbody>
</table>

      {filtered.length === 0 && (
        <p className="text-center py-4 text-muted-foreground">
          No transactions found
        </p>
      )}
    </div>
  );
}