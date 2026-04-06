# 💰 Finance Dashboard UI

A modern, responsive **Finance Dashboard** built using **Next.js (App Router) + TypeScript + shadcn/ui + Recharts**.
This project demonstrates clean UI design, state management, and interactive data visualization for tracking financial activities.

---

# 🚀 Live Features

## 📊 Dashboard Overview

* Displays **Total Balance, Income, and Expenses**
* Clean card-based UI
* Real-time updates based on transactions

---

## 📈 Analytics

* **Spending Trend (Line Chart)** — time-based visualization
* **Expense Breakdown (Pie Chart)** — category-wise distribution
* Charts are **dynamic and responsive**

---

## 📋 Transactions Management

* View all transactions with:

  * Date
  * Category
  * Amount
  * Type (Income/Expense)

### ✨ Features:

* 🔍 Search by category
* 📅 Sorted by date (ascending)
* 📝 Edit transactions (Admin only)
* 🗑️ Delete transactions (Admin only)

---

## 👤 Role-Based UI (RBAC Simulation)

* **Viewer**

  * Can only view data
* **Admin**

  * Can add, edit, delete transactions

👉 Role can be switched from dropdown (top-right)

---

## ➕ Add Transaction (Admin Only)

* Add new transaction with:

  * Amount
  * Category
  * Date
  * Type (Income/Expense)

---

## 💡 Insights Section

* Highest spending category
* Total income
* Total expenses

---

## 💾 Data Persistence

* Uses **localStorage**
* Data remains after refresh:

  * Transactions
  * User role

---

## 🎨 UI & UX

* Clean, minimal design using **shadcn/ui**
* Fully responsive layout
* Handles empty states gracefully
* Smooth hover and interaction feedback

---

# 🛠️ Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **UI Library:** shadcn/ui
* **Charts:** Recharts
* **State Management:** React Context API
* **Styling:** Tailwind CSS
* **Storage:** localStorage (for persistence)

---

# 📂 Project Structure

```
app/
 ├── components/
 │   ├── Charts.tsx
 │   ├── TransactionsTable.tsx
 │   ├── AddTransaction.tsx
 │   ├── Insights.tsx
 │
 ├── context/
 │   └── AppContext.tsx
 │
 ├── types/
 │   └── index.ts
 │
 ├── page.tsx
```

---

# ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone <your-repo-link>
cd finance-dashboard
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the development server

```bash
npm run dev
```

👉 Open: http://localhost:3000

---

# 🧠 Key Design Decisions

### ✅ Single Source of Truth

* All transactions managed via **Context API**
* Avoids prop drilling

---

### ✅ Type Safety

* Centralized types in `/types`
* Prevents duplication and errors

---

### ✅ LocalStorage Persistence

* Used lazy initialization for state
* Avoids unnecessary re-renders

---

### ✅ Clean Component Structure

* Modular and reusable components
* Separation of concerns

---

### ✅ Data Handling

* Transactions sorted by date
* Defensive checks for undefined values

---

# 📌 Assumptions

* Data is mocked (no backend)
* Dates are user-provided for meaningful analytics
* No authentication (role simulation only)

---

# 🔮 Possible Improvements

* Backend integration (Node.js / Firebase)
* Authentication & real RBAC
* Export data (CSV/Excel)
* Dark mode 🌙
* Advanced filters (date range, categories)
* Monthly aggregation in charts

---

# 🏆 Conclusion

This project demonstrates:

* Strong frontend fundamentals
* Clean UI/UX thinking
* Proper state management
* Real-world problem-solving approach

---

# 🙌 Author

**Mayank Kumar Singh**

---

👉 *This project was built as part of a frontend evaluation assignment and focuses on clarity, usability, and clean architecture.*

