"use client";

import { useApp } from "./context/AppContext";
import { Card, CardContent } from "./components/ui/card";
import TransactionsTable from "./components/TransactionsTable";
import Charts from "./components/Charts";
import Insights from "./components/Insights";
import AddTransaction from "./components/AddTransaction";
import ThemeToggle from "./components/ThemeToggle";

const selectClassName =
  "h-9 rounded-lg border border-input bg-background px-3 text-sm font-medium text-foreground shadow-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

function DashboardContent() {
  const { transactions, role, setRole } = useApp();

  const income = transactions.filter(t => t.type === "income").reduce((a, t) => a + t.amount, 0);
  const expense = transactions.filter(t => t.type === "expense").reduce((a, t) => a + t.amount, 0);
  const balance = income - expense;

  return (
    <div className="min-h-screen bg-muted/40 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-semibold">Finance Dashboard</h1>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <ThemeToggle />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as "viewer" | "admin")}
              className={`${selectClassName} w-full sm:w-auto`}
              aria-label="Select role"
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        {/* -------- OVERVIEW SECTION -------- */}
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold">Overview</h2>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <Card className="shadow-sm transition hover:scale-[1.02]">
              <CardContent className="p-3 sm:p-5">
                <p className="text-xs sm:text-sm text-muted-foreground">Balance</p>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2">₹ {balance}</h2>
              </CardContent>
            </Card>

            <Card className="shadow-sm transition hover:scale-[1.02]">
              <CardContent className="p-3 sm:p-5">
                <p className="text-xs sm:text-sm text-muted-foreground">Income</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-green-600 mt-2">
                  ₹ {income}
                </h2>
              </CardContent>
            </Card>

            <Card className="shadow-sm transition hover:scale-[1.02]">
              <CardContent className="p-3 sm:p-5">
                <p className="text-xs sm:text-sm text-muted-foreground">Expenses</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-red-600 mt-2">
                  ₹ {expense}
                </h2>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* -------- ANALYTICS SECTION -------- */}
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold">Analytics</h2>

          <Charts />
        </div>

        {/* -------- INSIGHTS SECTION -------- */}
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold">Insights</h2>

          <Insights />
        </div>

        {/* -------- ADMIN SECTION -------- */}
        <AddTransaction />

        {/* -------- TRANSACTIONS SECTION -------- */}
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold">Transactions</h2>

          <TransactionsTable />
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
