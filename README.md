# Resume Analyzer Backend

A robust backend service for a Resume Analyzer application, featuring a secure authentication system with JWT, password hashing, and token blacklisting for logout functionality.

## 🚀 Features

- **User Authentication**: Secure registration and login system.
- **Password Security**: Uses `bcryptjs` for salt-hashing passwords.
- **JWT Implementation**: Generates JSON Web Tokens for session management.
- **Secure Logout**: Implements a blacklisting system to invalidate tokens upon logout.
- **Database Integration**: MongoDB integration with Mongoose schemas.
- **Environment Management**: Configuration handled via `dotenv`.

## 🛠️ Tech Stack

- **Node.js** & **Express**
- **MongoDB** & **Mongoose**
- **JWT (jsonwebtoken)**
- **Bcrypt.js**
- **Cookie-parser**

## 📋 API Endpoints

### Authentication
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Login and receive a cookie token | Public |
| GET | `/api/auth/logout` | Logout and blacklist the token | Public |

## ⚙️ Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/devesh202/Resume-Analyzer.git
   cd Resume-Analyzer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

4. **Run the server**:
   ```bash
   # Development mode
   npm run dev

   # Production mode
   node server.js
   ```

## 📂 Project Structure

```text
├── src/
│   ├── config/          # Database configuration
│   ├── controllers/     # Business logic for routes
│   ├── models/          # Mongoose schemas (User, Blacklist)
│   ├── routes/          # API route definitions
│   └── app.js           # Express app setup
├── server.js            # Entry point
└── .env                 # Environment variables
```

## 🛡️ Security Features

- **Token Blacklisting**: When a user logs out, their current JWT is added to a `BlacklistTokens` collection in MongoDB, preventing it from being used again until it expires.
- **Cookie Security**: Tokens are handled via cookies for better security practices.
- **Input Validation**: Basic validation for required fields in registration and login.
