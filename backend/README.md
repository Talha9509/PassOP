# 🔐 PassOp - Password Manager (Backend)

This is a simple Express-based backend for a password manager application named **PassOp**. It allows saving, retrieving, and deleting password entries in MongoDB.

> ⚠️ **Not intended for production use.** This backend does not support authentication, encryption, or multi-user logic.

---

## 🚀 Features

- ✅ Connects to **MongoDB Atlas** using `dotenv` for secure environment variables.
- 📥 Supports **GET**, **POST**, and **DELETE** operations for passwords.
- 🧠 Uses MongoDB’s native driver (`mongodb`) for basic CRUD operations.
- 🪵 Logs incoming data and DB operations for debugging.

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (using native driver)
- dotenv
- CORS and Body-parser middleware
