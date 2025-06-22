# PassOP - Password Manager

A simple password manager built with React, Vite, Tailwind CSS, Express, and MongoDB.

## Features

- Add, edit, and delete website credentials (site, username, password)
- Passwords are stored in a MongoDB database via a Node.js/Express backend
- Copy site, username, or password to clipboard with one click
- Show/hide password input
- Responsive UI styled with Tailwind CSS
- Toast notifications for actions
- No authentication (for demo/learning purposes only)

## Project Structure

```
├── backend/           # Express + MongoDB backend
│   ├── .env           # MongoDB connection string
│   ├── package.json
│   └── server.js
├── public/            # Static assets (icons, images)
├── src/               # React frontend
│   ├── App.jsx
│   ├── main.jsx
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Manager.jsx
│   │   └── Navbar.jsx
│   └── assets/
├── package.json       # Frontend dependencies/scripts
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── index.html
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB running locally (default: `mongodb://localhost:27017`)

### Backend Setup

1. Install backend dependencies:
   ```sh
   cd backend
   npm install
   ```

2. Create a `.env` file in `backend/`:
   ```
   MONGO_URI=mongodb://localhost:27017
   ```

3. Start the backend server:
   ```sh
   node server.js
   ```
   The backend runs on [http://localhost:3000](http://localhost:3000).

### Frontend Setup

1. Install frontend dependencies:
   ```sh
   npm install
   ```

2. Start the development server:
   ```sh
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173) (default Vite port).

## Usage

- Enter a website URL, username, and password, then click **Save**.
- Your saved credentials appear in a table below.
- Use the copy icons to copy site, username, or password.
- Use the edit and delete icons to modify or remove entries.

## Notes

- **Security Warning:** This app is for learning/demo only. Passwords are stored in plaintext, there is no authentication, and all users share the same database.
- For production, add authentication, encryption, and user separation.

## License

MIT

---

Created by Mohd Adbul Wasay