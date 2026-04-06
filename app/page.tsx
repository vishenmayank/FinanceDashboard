"use client";

import { AppProvider, useApp } from "./context/AppContext";
import { Card, CardContent } from "./components/ui/card";
import TransactionsTable from "./components/TransactionsTable";
import Charts from "./components/Charts";
import Insights from "./components/Insights";
import AddTransaction from "./components/AddTransaction";

function DashboardContent() {
  const { transactions, role, setRole } = useApp();

  const income = transactions.filter(t => t.type === "income").reduce((a, t) => a + t.amount, 0);
  const expense = transactions.filter(t => t.type === "expense").reduce((a, t) => a + t.amount, 0);
  const balance = income - expense;

  return (
    <div className="min-h-screen bg-muted/40 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Finance Dashboard</h1>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value as "viewer" | "admin")}
            className="border-3 px-3 py-1 rounded border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-xl font-bold"
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* -------- OVERVIEW SECTION -------- */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Overview</h2>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="shadow-sm transition hover:scale-[1.02]">
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">Balance</p>
                <h2 className="text-3xl font-bold mt-2">₹ {balance}</h2>
              </CardContent>
            </Card>

            <Card className="shadow-sm transition hover:scale-[1.02]">
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">Income</p>
                <h2 className="text-3xl font-bold text-green-600 mt-2">
                  ₹ {income}
                </h2>
              </CardContent>
            </Card>

            <Card className="shadow-sm transition hover:scale-[1.02]">
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">Expenses</p>
                <h2 className="text-3xl font-bold text-red-600 mt-2">
                  ₹ {expense}
                </h2>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* -------- ANALYTICS SECTION -------- */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Analytics</h2>

          <Charts />
        </div>

        {/* -------- INSIGHTS SECTION -------- */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Insights</h2>

          <Insights />
        </div>

        {/* -------- ADMIN SECTION -------- */}
        <AddTransaction />

        {/* -------- TRANSACTIONS SECTION -------- */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Transactions</h2>

          <TransactionsTable />
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <AppProvider>
      <DashboardContent />
    </AppProvider>
  );
}