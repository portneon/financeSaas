# API Reference Guide

This guide details exactly **what each endpoint does**, **who has permission** to access it, and **what actions (work)** can be performed.

All endpoints (except Authentication) are secure and require a valid JWT token sent in the `Authorization: Bearer <token>` header. 

---

## 1. Authentication Endpoints

### 🔑 User Login
- **Endpoint:** `POST /api/v1/auth/login`
- **Who can access:** Anyone (Publicly accessible).
- **What it does:** Authenticates a user's credentials against the database.
- **Work Performed:** Verifies the user email and password. If correct, the server generates and returns a secure JWT Token which is required to unlock all the private APIs listed below.

---

## 2. Admin & User Management Endpoints

### 🛡️ Create New Users
- **Endpoint:** `POST /api/v1/admins/users`
- **Who can access:** Only **`ADMIN`** users.
- **What it does:** Registers a newly created Analyst or Viewer inside the system.
- **Work Performed:** Safely hashes their new password, links them logically under the Admin who created them, and assigns them their permanent specific role.

### 👥 View Subordinates
- **Endpoint:** `GET /api/v1/admins/:id/users`
- **Who can access:** Only **`ADMIN`** users.
- **What it does:** Retrieves a list of users governed by an Admin.
- **Work Performed:** Returns an array of Analyst/Viewer accounts mapping back to the Admin's specific `adminId` tag.

---

## 3. Financial Transaction Endpoints

### 📝 Create Transaction
- **Endpoint:** `POST /api/v1/transactions`
- **Who can access:** Only **`ADMIN`** users.
- **What it does:** Submits a new financial entry (Income or Expense) into the database.
- **Work Performed:** Parses the payload (amount, category, type, date, notes) and records it to the user's permanent financial ledger.

### 📋 View All Transactions
- **Endpoint:** `GET /api/v1/transactions`
- **Who can access:** Only **`ADMIN`** users.
- **What it does:** Fetches the raw transaction history.
- **Work Performed:** Retrieves all chronologically recorded transactions tied exclusively to the user ID provided inside the JWT token. 

### ✏️ Update a Transaction
- **Endpoint:** `PUT /api/v1/transactions/:id`
- **Who can access:** Only **`ADMIN`** users.
- **What it does:** Edits an existing financial entry.
- **Work Performed:** Modifies the amount, type, category, or notes of a specific transaction that was previously logged incorrectly.

### 🗑️ Delete a Transaction
- **Endpoint:** `DELETE /api/v1/transactions/:id`
- **Who can access:** Only **`ADMIN`** users.
- **What it does:** Permanently removes an entry.
- **Work Performed:** Deletes a specific logged transaction entirely from the MySQL database.

---

## 4. Dashboard & Analytics Endpoints

### 📊 Financial Overview (Widgets)
- **Endpoint:** `GET /api/v1/dashboard`
- **Who can access:** **All Authenticated Roles** (`ADMIN`, `ANALYST`, etc.)
- **What it does:** Delivers a calculated overview of a user's financial health.
- **Work Performed:** The database natively executes complex aggregations (`SUM` and `GROUP BY`) to instantly provide:
    - **Total Net Income & Expenses**
    - **Net Balance Calculation**
    - **Category-wise Totals** (e.g. How much spent on Food vs Rent)
    - **Recent Activity** (The last 10 entries)
- **Modifiable Filters:** Allows dynamic URL querying by `?startDate=X`, `?endDate=Y`, `?category=Z` or `?type=EXPENSE`.

### 📈 Historical Trends
- **Endpoint:** `GET /api/v1/dashboard/trends`
- **Who can access:** **All Authenticated Roles** (`ADMIN`, `ANALYST`, etc.)
- **What it does:** Provides the math to render analytical charts/graphs over time.
- **Work Performed:** Aggregates and groups your revenue/spending linearly across different weeks or months (defined via the `granularity=monthly` query parameter).
