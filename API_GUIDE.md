# API Reference Guide

This guide documents every endpoint in the finance project, including access rules, request payloads, query parameters, and response behavior.

> All endpoints except `/api/v1/auth/login` and `/api/v1/auth/register` require a valid JWT in the header:
> `Authorization: Bearer <token>`

---

## 1. Authentication Endpoints

### 1.1 Login

- **Endpoint:** `POST /api/v1/auth/login`
- **Access:** Public
- **Description:** Authenticate a user and return a JWT token.

Request Body:

- `email` (string, required)
- `password` (string, required)

Example:

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

Success Response (200):

```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "...",
      "name": "...",
      "email": "...",
      "role": "ADMIN",
      "adminId": null
    },
    "token": "<jwt-token>"
  }
}
```

Error Responses:

- `400` if `email` or `password` is missing
- `401` if credentials are invalid

---

### 1.2 Register Admin

- **Endpoint:** `POST /api/v1/auth/register`
- **Access:** Public (intended for testing only)
- **Description:** Creates a new admin user.

Request Body:

- `name` (string, required)
- `email` (string, required)
- `password` (string, required)

Example:

```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "password123"
}
```

Success Response (200):

- Returns the newly created admin record.

Error Responses:

- `400` if required fields are missing
- `401` if user already exists

---

## 2. Admin & User Management Endpoints

> These routes require:
>
> - valid JWT token
> - user role must be `ADMIN`

### 2.1 Create New User

- **Endpoint:** `POST /api/v1/admins/users`
- **Access:** `ADMIN`
- **Description:** Creates a new subordinate user with role `ANALYST` or `VIEWER`.

Request Body:

- `name` (string, required)
- `email` (string, required)
- `password` (string, required)
- `role` (string, required) — `ANALYST` or `VIEWER`

Example:

```json
{
  "name": "Analyst One",
  "email": "analyst@example.com",
  "password": "securepass",
  "role": "ANALYST"
}
```

Success Response (201):

```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "...",
      "name": "Analyst One",
      "email": "analyst@example.com",
      "role": "ANALYST",
      "adminId": "<admin-id>"
    }
  }
}
```

Error Responses:

- `400` if required fields are missing or role is invalid
- `403` if the authenticated user is not `ADMIN`

---

### 2.2 List Admin Subordinates

- **Endpoint:** `GET /api/v1/admins/:id/users`
- **Access:** `ADMIN`
- **Description:** Returns users created by a given admin.

Path Parameters:

- `id` (string) — admin user ID

Success Response (200):

- Returns an array of subordinate users.

Error Responses:

- `403` if not `ADMIN`
- `401` if token is missing/invalid

---

## 3. Financial Transaction Endpoints

> These routes require valid JWT and `ADMIN` role.

### 3.1 Create Transaction

- **Endpoint:** `POST /api/v1/transactions`
- **Access:** `ADMIN`
- **Description:** Create a transaction record for the authenticated admin.

Request Body:

- `amount` (number, required)
- `type` (string, required) — `INCOME` or `EXPENSE`
- `category` (string, required)
- `date` (string, required) — ISO date string
- `notes` (string, optional)

Example:

```json
{
  "amount": 450.0,
  "type": "INCOME",
  "category": "Sales",
  "date": "2026-04-05T00:00:00.000Z",
  "notes": "April revenue"
}
```

Success Response (201):

```json
{
  "status": "success",
  "data": {
    "transaction": {
      "id": "...",
      "amount": 450.0,
      "type": "INCOME",
      "category": "Sales",
      "date": "2026-04-05T00:00:00.000Z",
      "notes": "April revenue",
      "userId": "..."
    }
  }
}
```

Error Responses:

- `400` if required fields are missing or type is invalid
- `403` if not `ADMIN`

---

### 3.2 Get All Transactions

- **Endpoint:** `GET /api/v1/transactions`
- **Access:** `ADMIN`
- **Description:** Retrieve all transactions for the authenticated user.

Success Response (200):

```json
{
  "status": "success",
  "data": {
    "transactions": [
      {
        "id": "...",
        "amount": 450.0,
        "type": "INCOME",
        "category": "Sales",
        "date": "2026-04-05T00:00:00.000Z",
        "notes": "April revenue",
        "userId": "..."
      }
    ]
  }
}
```

---

### 3.3 Get Transaction by ID

- **Endpoint:** `GET /api/v1/transactions/:id`
- **Access:** `ADMIN`
- **Description:** Get a single transaction by its ID.

Path Parameters:

- `id` (string) — transaction ID

Success Response (200):

```json
{
  "status": "success",
  "data": {
    "transaction": {
      "id": "..."
    }
  }
}
```

Error Responses:

- `404` if transaction is not found

---

### 3.4 Update Transaction

- **Endpoint:** `PUT /api/v1/transactions/:id`
- **Access:** `ADMIN`
- **Description:** Update a transaction's fields.

Path Parameters:

- `id` (string) — transaction ID

Request Body (any subset):

- `amount` (number)
- `type` (string) — `INCOME` or `EXPENSE`
- `category` (string)
- `date` (string) — ISO date string
- `notes` (string)

Success Response (200):

```json
{
  "status": "success",
  "data": {
    "transaction": {
      "id": "...",
      "amount": 500.0,
      "type": "EXPENSE",
      "category": "Office",
      "date": "2026-04-05T00:00:00.000Z",
      "notes": "Updated notes"
    }
  }
}
```

Error Responses:

- `404` if transaction not found

---

### 3.5 Delete Transaction

- **Endpoint:** `DELETE /api/v1/transactions/:id`
- **Access:** `ADMIN`
- **Description:** Permanently delete a transaction.

Path Parameters:

- `id` (string) — transaction ID

Success Response (200):

```json
{
  "status": "success",
  "message": "Transaction deleted successfully"
}
```

Error Responses:

- `404` if transaction not found

---

## 4. Dashboard & Analytics Endpoints

> These routes require a valid JWT token. Any authenticated role may access them.

### 4.1 Financial Overview

- **Endpoint:** `GET /api/v1/dashboard`
- **Access:** `ADMIN`, `ANALYST`, `VIEWER`
- **Description:** Returns financial summary, category totals, and recent activity for the authenticated user.

Query Parameters:

- `startDate` (string, optional) — ISO date to filter from
- `endDate` (string, optional) — ISO date to filter to
- `category` (string, optional)
- `type` (string, optional) — `INCOME` or `EXPENSE`

Example:
`GET /api/v1/dashboard?startDate=2026-01-01&endDate=2026-04-01&type=EXPENSE`

Success Response (200):

```json
{
  "status": "success",
  "data": {
    "summary": {
      "totalIncome": 1000,
      "totalExpense": 400,
      "netBalance": 600
    },
    "categoryTotals": [
      { "category": "Food", "amount": 150 },
      { "category": "Rent", "amount": 250 }
    ],
    "recentActivity": [
      {
        "id": "...",
        "amount": 80,
        "type": "EXPENSE",
        "category": "Food",
        "date": "2026-04-05T00:00:00.000Z",
        "notes": "Lunch"
      }
    ]
  }
}
```

---

### 4.2 Historical Trends

- **Endpoint:** `GET /api/v1/dashboard/trends`
- **Access:** `ADMIN`, `ANALYST`, `VIEWER`
- **Description:** Returns revenue/spending trends over time.

Query Parameters:

- `startDate` (string, optional)
- `endDate` (string, optional)
- `category` (string, optional)
- `type` (string, optional) — `INCOME` or `EXPENSE`
- `granularity` (string, optional) — `weekly` or `monthly` (default: `monthly`)

Success Response (200):

```json
{
  "status": "success",
  "data": {
    "trends": [
      {
        "period": "2026-03",
        "income": 1000,
        "expense": 400
      }
    ]
  }
}
```

---

## 5. Data Models

### User

- `id`: string
- `name`: string
- `email`: string
- `role`: `ADMIN` | `ANALYST` | `VIEWER`
- `adminId`: string | null

### Transaction

- `id`: string
- `amount`: float
- `type`: `INCOME` | `EXPENSE`
- `category`: string
- `date`: DateTime
- `notes`: string | null
- `userId`: string

---

## 6. Notes

- `ADMIN` can create other users and manage transactions.
- `ANALYST` and `VIEWER` can only access dashboard endpoints.
- The token payload includes `id`, `role`, and `email`.
- Transaction deletion is permanent.
