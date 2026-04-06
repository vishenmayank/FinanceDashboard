"use client";

import { useApp } from "../context/AppContext";
import { Card, CardContent } from "./ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Transaction } from "../data/transactions";

type LineData = {
  date: string;
  amount: number;
};

type PieData = {
  name: string;
  value: number;
};

const COLORS = ["#22c55e", "#ef4444", "#3b82f6", "#f59e0b", "#8b5cf6"];

export default function Charts() {
  const { transactions } = useApp();

  // ✅ Ensure safe typed transactions
  const safeTransactions: Transaction[] = Array.isArray(transactions)
    ? transactions
    : [];

  // 📈 Line Chart Data
 const sortedTransactions = [...safeTransactions].sort(
  (a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
);

const lineData = sortedTransactions.map((t) => ({
  date: t.date,
  amount: t.amount,
}));

  // 🥧 Pie Chart Data (expenses only)
  const categoryMap: Record<string, number> = {};

  safeTransactions.forEach((t) => {
    if (t.type === "expense" && t.category) {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const pieData: PieData[] = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

      {/* Line Chart */}
      <Card>
        <CardContent className="p-3 sm:p-4">
          <h3 className="text-base sm:text-lg font-semibold mb-2">Spending Trend</h3>

          <ResponsiveContainer width="100%" height={200} minHeight={200}>
            <LineChart data={lineData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" />
            </LineChart>
          </ResponsiveContainer>

        </CardContent>
      </Card>

      {/* Pie Chart */}
      <Card>
        <CardContent className="p-3 sm:p-4">
          <h3 className="text-base sm:text-lg font-semibold mb-2">
            Expense Breakdown
          </h3>

          <ResponsiveContainer width="100%" height={200} minHeight={200}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" label>
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

        </CardContent>
      </Card>

    </div>
  );
}