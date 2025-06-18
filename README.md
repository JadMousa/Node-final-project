# 📚 Library Web App – Backend

This is the backend of the **Library Management Web App**, developed with **Node.js**, **Express.js**, and **PostgreSQL**. It provides RESTful API endpoints to support user authentication, book management, and reservation tracking. Admin-only routes are protected via custom middleware.

---

## ✨ Features

- 🛠️ **RESTful API** for frontend integration  
- 🔐 **Role-based Access Control** (admin vs. user)  
- 📚 **Books API** – Add, edit, delete, and fetch books  
- 📆 **Reservations API** – Handle borrowing records  
- 👤 **Users API** – Register and manage user details  
- 🧰 **Middleware** for admin checks (`checkAdmin.js`)  
- 🔐 **.env Configuration** for secure credentials

---

## 🛠️ Tech Stack

- **Backend Framework:** Node.js, Express.js  
- **Database:** PostgreSQL  
- **Authentication:** Auth0 (token-based via frontend)  
- **Environment Management:** dotenv  
- **Routing:** Modular route handling via Express Routers

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- PostgreSQL
- npm
- Auth0 account (for access tokens)
- `.env` file configured

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/library-backend.git
   cd library-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up your environment variables**
   Create a `.env` file in the root folder:
   ```env
   PORT=3002
   DATABASE_URL=your_postgres_connection_string
   ```

4. **Run the server**
   ```bash
   npm start
   ```

---

## 📁 Folder Structure

```
routes/
├── books.js          # Endpoints for adding, updating, deleting books
├── reservations.js   # Handle user borrowing/reservations
├── users.js          # Register & fetch user details

middleware/
└── checkAdmin.js     # Middleware to restrict admin-only routes

.env                  # Environment variables
```

---

## 📎 Notes

- The backend expects tokens from Auth0 to be passed via headers (from frontend login).
- The API is designed to interface with the React frontend at `http://localhost:3000`.

---

## 📜 License

This project is for educational use only.
