# Resume Analyzer

A comprehensive Full-Stack application designed to analyze resumes using AI. The project is structured into a Backend service and a Frontend interactive dashboard.

## 📁 Project Structure

The project is divided into two main parts:

- **[Backend](./Backend)**: Node.js & Express server with MongoDB integration.
- **[Frontend](./Frontend)**: React & Vite application for the user interface.

## 🛠️ Tech Stack

### Backend
- **Node.js** & **Express**
- **MongoDB** & **Mongoose**
- **JWT** (JSON Web Tokens) for authentication
- **Bcrypt.js** for secure password hashing

### Frontend
- **React** (Vite)
- **SCSS** for modern styling
- **React Router** for navigation
- **Lucide React** for icons

## 🏗️ Architecture

The Frontend follows a **4-Layer Architecture** for better scalability and maintainability:

1. **UI Layer**: 
   - `components`: Reusable UI elements.
   - `Pages`: Main application screens.
2. **Hook Layer**:
   - `hooks`: Custom React hooks for logic reuse.
3. **State Layer**:
   - `auth.context.jsx`: Authentication state management.
   - `ai.context.jsx`: AI analysis state management.
4. **API Layer**:
   - `services`: API calls and external data fetching.

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB instance (local or Atlas)

### Setup

1. **Backend**:
   ```bash
   cd Backend
   npm install
   # Create .env file with MONGO_URI and JWT_SECRET
   npm run dev
   ```

2. **Frontend**:
   ```bash
   cd Frontend
   npm install
   npm run dev
   ```
