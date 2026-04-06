"use client";

import { useApp } from "../context/AppContext";
import { Card, CardContent } from "./ui/card";
import {
  CartesianGrid,
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
import { useTheme } from "../context/ThemeContext";

type LineData = {
  date: string;
  amount: number;
};

type PieData = {
  name: string;
  value: number;
};

export default function Charts() {
  const { transactions } = useApp();
  const { theme } = useTheme();

  // ✅ Ensure safe typed transactions
  const safeTransactions: Transaction[] = Array.isArray(transactions)
    ? transactions
    : [];

  // 📈 Line Chart Data
  const sortedTransactions = [...safeTransactions].sort(
    (a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const lineData: LineData[] = sortedTransactions.map((t) => ({
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

  const chartPalette =
    theme === "dark"
      ? {
          axis: "#e5e7eb",
          grid: "rgba(255, 255, 255, 0.12)",
          tooltipBackground: "#111827",
          tooltipBorder: "#374151",
          tooltipText: "#f9fafb",
          line: "#60a5fa",
          dot: "#bfdbfe",
          pie: ["#34d399", "#f87171", "#60a5fa", "#fbbf24", "#c084fc"],
        }
      : {
          axis: "#4b5563",
          grid: "rgba(17, 24, 39, 0.10)",
          tooltipBackground: "#ffffff",
          tooltipBorder: "#d1d5db",
          tooltipText: "#111827",
          line: "#2563eb",
          dot: "#1d4ed8",
          pie: ["#16a34a", "#dc2626", "#2563eb", "#d97706", "#7c3aed"],
        };

  const tooltipStyle = {
    backgroundColor: chartPalette.tooltipBackground,
    border: `1px solid ${chartPalette.tooltipBorder}`,
    borderRadius: "0.75rem",
    color: chartPalette.tooltipText,
  };

  const formatCurrency = (value: unknown) => {
    const numericValue = typeof value === "number" || typeof value === "string"
      ? Number(value)
      : 0;

    return `₹ ${numericValue}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      {/* Line Chart */}
      <Card>
        <CardContent className="p-3 sm:p-4">
          <h3 className="text-base sm:text-lg font-semibold mb-2">Spending Trend</h3>

          <ResponsiveContainer width="100%" height={200} minHeight={200}>
            <LineChart data={lineData}>
              <CartesianGrid stroke={chartPalette.grid} strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tick={{ fill: chartPalette.axis, fontSize: 12 }} axisLine={{ stroke: chartPalette.grid }} tickLine={{ stroke: chartPalette.grid }} />
              <YAxis tick={{ fill: chartPalette.axis, fontSize: 12 }} axisLine={{ stroke: chartPalette.grid }} tickLine={{ stroke: chartPalette.grid }} />
              <Tooltip
                contentStyle={tooltipStyle}
                cursor={{ stroke: chartPalette.grid }}
                labelStyle={{ color: chartPalette.tooltipText, fontWeight: 600 }}
                itemStyle={{ color: chartPalette.tooltipText }}
                formatter={(value) => [formatCurrency(value), "Amount"]}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke={chartPalette.line}
                strokeWidth={3}
                dot={{ fill: chartPalette.dot, r: 4 }}
                activeDot={{ fill: chartPalette.dot, r: 6 }}
              />
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
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                labelLine={false}
                label={({ cx, cy, midAngle, outerRadius, percent, name }) => {
                  if (!percent) {
                    return null;
                  }

                  const radius = Number(outerRadius) + 18;
                  const angle = (-Number(midAngle) * Math.PI) / 180;
                  const x = Number(cx) + radius * Math.cos(angle);
                  const y = Number(cy) + radius * Math.sin(angle);

                  return (
                    <text
                      x={x}
                      y={y}
                      fill={chartPalette.axis}
                      fontSize={12}
                      textAnchor={x > Number(cx) ? "start" : "end"}
                      dominantBaseline="central"
                    >
                      {`${name} ${Math.round(percent * 100)}%`}
                    </text>
                  );
                }}
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={chartPalette.pie[index % chartPalette.pie.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={{ color: chartPalette.tooltipText, fontWeight: 600 }}
                itemStyle={{ color: chartPalette.tooltipText }}
                formatter={(value, _name, item) => [
                  formatCurrency(value),
                  String(item.payload?.name ?? "Category"),
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
