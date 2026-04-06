"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { useApp } from "../context/AppContext";
import type { Transaction } from "../types";
import { Button } from "./ui/button";

const badgeClassNames = {
  income: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  expense: "bg-red-500/15 text-red-700 dark:text-red-300",
} as const;

const fieldClassName =
  "h-8 w-full rounded-lg border border-input bg-background px-2.5 py-1 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

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
    <div className="rounded-xl border bg-card p-3 text-card-foreground shadow-sm sm:p-4">
      <div className="space-y-4">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <h2 className="text-base sm:text-lg font-semibold">Transactions</h2>
          <Input
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:max-w-xs"
          />
        </div>

        {/* Mobile View - Cards */}
        <div className="block space-y-3 sm:hidden">
          {filtered.map((t) => (
            <div key={t.id} className="space-y-2 rounded-lg border border-border bg-muted/40 p-3">
              <div className="flex items-start justify-between">
                <span className="text-xs font-medium text-muted-foreground">Date: {t.date}</span>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${badgeClassNames[t.type]}`}
                >
                  {t.type}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{t.category}</span>
                <span className="text-sm font-bold">₹ {t.amount}</span>
              </div>
              {role === "admin" && (
                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={() => startEdit(t)}
                    size="sm"
                    className="flex-1"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteTransaction(t.id)}
                    variant="destructive"
                    size="sm"
                    className="flex-1"
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop View - Table */}
        <div className="hidden overflow-x-auto sm:block">
          <table className="w-full border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-muted/70 text-left">
                <th className="w-[20%] p-2 sm:p-3">Date</th>
                <th className="w-[25%] p-2 sm:p-3">Category</th>
                <th className="w-[20%] p-2 text-right sm:p-3">Amount</th>
                <th className="w-[15%] p-2 sm:p-3">Type</th>
                {role === "admin" && (
                  <th className="w-[20%] p-2 text-center sm:p-3">Actions</th>
                )}
              </tr>
            </thead>

            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="border-t border-border hover:bg-muted/40">
                  {/* DATE */}
                  <td className="p-2 align-middle sm:p-3">
                    {editingId === t.id ? (
                      <input
                        type="date"
                        value={editData?.date}
                        onChange={(e) =>
                          setEditData({ ...editData!, date: e.target.value })
                        }
                        className={fieldClassName}
                      />
                    ) : (
                      t.date
                    )}
                  </td>

                  {/* CATEGORY */}
                  <td className="p-2 align-middle sm:p-3">
                    {editingId === t.id ? (
                      <input
                        value={editData?.category}
                        onChange={(e) =>
                          setEditData({ ...editData!, category: e.target.value })
                        }
                        className={fieldClassName}
                      />
                    ) : (
                      t.category
                    )}
                  </td>

                  {/* AMOUNT */}
                  <td className="p-2 text-right align-middle font-medium sm:p-3">
                    {editingId === t.id ? (
                      <input
                        type="number"
                        value={editData?.amount}
                        onChange={(e) =>
                          setEditData({
                            ...editData!,
                            amount: Number(e.target.value),
                          })
                        }
                        className={`${fieldClassName} text-right`}
                      />
                    ) : (
                      `₹ ${t.amount}`
                    )}
                  </td>

                  {/* TYPE */}
                  <td className="p-2 align-middle sm:p-3">
                    {editingId === t.id ? (
                      <select
                        value={editData?.type}
                        onChange={(e) =>
                          setEditData({
                            ...editData!,
                            type: e.target.value as "income" | "expense",
                          })
                        }
                        className={fieldClassName}
                      >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                      </select>
                    ) : (
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${badgeClassNames[t.type]}`}
                      >
                        {t.type}
                      </span>
                    )}
                  </td>

                  {/* ACTIONS */}
                  {role === "admin" && (
                    <td className="space-x-1 p-2 text-center align-middle sm:space-x-2 sm:p-3">
                      {editingId === t.id ? (
                        <Button
                          onClick={saveEdit}
                          size="sm"
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          onClick={() => startEdit(t)}
                          size="sm"
                        >
                          Edit
                        </Button>
                      )}

                      <Button
                        onClick={() => deleteTransaction(t.id)}
                        variant="destructive"
                        size="sm"
                      >
                        Delete
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <p className="py-4 text-center text-xs text-muted-foreground sm:text-sm">
            No transactions found
          </p>
        )}
      </div>
    </div>
  );
}
