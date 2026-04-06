"use client";

import { useApp } from "../context/AppContext";
import { Card, CardContent } from "./ui/card";

export default function Insights() {
  const { transactions } = useApp();

  // Highest spending category
  const expenseMap: Record<string, number> = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      expenseMap[t.category] =
        (expenseMap[t.category] || 0) + t.amount;
    }
  });

  let topCategory = "N/A";
  let max = 0;

  Object.entries(expenseMap).forEach(([cat, amt]) => {
    if (amt > max) {
      max = amt;
      topCategory = cat;
    }
  });

  // Total income vs expense
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, t) => a + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, t) => a + t.amount, 0);

  return (
    <div className="grid md:grid-cols-3 gap-4">

      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">
            Highest Spending Category
          </p>
          <h2 className="text-xl font-bold mt-2">
            {topCategory} (₹ {max})
          </h2>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">
            Total Income
          </p>
          <h2 className="text-xl font-bold text-green-600 mt-2">
            ₹ {income}
          </h2>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">
            Total Expenses
          </p>
          <h2 className="text-xl font-bold text-red-600 mt-2">
            ₹ {expense}
          </h2>
        </CardContent>
      </Card>

    </div>
  );
}