# Finance Analytics Backend

A robust, role-based backend system for managing financial records, users, and detailed analytics dashboards. This system provides strict access controls, data aggregations, and RESTful APIs.

## Technology Stack

The project is built with the following technologies:
- **Node.js**: JavaScript runtime environment.
- **TypeScript**: Statically typed superset of JavaScript for reliable coding.
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **Prisma**: Next-generation Node.js and TypeScript ORM.
- **MySQL**: Relational database for persistent storage.
- **JSON Web Tokens (JWT)**: Secure authentication and role-based authorization.
- **Bcrypt**: Password hashing.
- **ts-node-dev**: Rapid compilation and auto-reloading for development.

---

## Installation & Setup

Follow these steps to get the project running locally:

### 1. Install Dependencies
Make sure you have Node.js and npm installed. From the root directory of the project, run:
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory and define the following variables:
```env
# Your MySQL connection string
DATABASE_URL="mysql://root:@localhost:3306/finance_db"

# Secret key for signing JWTs
JWT_SECRET="your-super-secret-key"

PORT=3000
```

### 3. Setup the Database
Use Prisma to push the schema to your MySQL database and generate the TypeScript client:
```bash
npx prisma db push
npx prisma generate
```
*(Note: Use `npx prisma migrate dev` if you are tracking migrations instead of pushing directly).*

### 4. Start the Server
Start the development server with auto-reloading:
```bash
npm run dev
```
The server will be available at `http://localhost:3000`.

---

