# Resume Analyzer

A comprehensive Full-Stack application designed to analyze resumes using AI. The project is structured into a Backend service and a Frontend interactive dashboard.

## 📁 Project Structure

The project is divided into two main parts:

- **[Backend](./Backend)**: Node.js & Express server with MongoDB integration.
- **[Frontend](./Frontend)**: React & Vite application for the user interface.

```
Resume Analyzer/
├── Backend/
│   ├── server.js                          # Entry point
│   └── src/
│       ├── app.js                         # Express app setup
│       ├── config/
│       │   └── database.js                # MongoDB connection
│       ├── routes/
│       │   ├── auth.routes.js             # Auth endpoints
│       │   └── interview.routes.js        # Interview endpoints
│       ├── controllers/
│       │   ├── auth.controller.js         # Auth request handling
│       │   └── interview.controller.js    # Interview request handling
│       ├── services/
│       │   ├── ai.services.js             # Gemini AI integration
│       │   └── sample_resume.js           # Sample resume for testing
│       ├── middlewares/
│       │   ├── auth.middleware.js          # JWT verification
│       │   └── file.middleware.js          # Multer file uploads
│       └── models/
│           ├── user.model.js              # User schema
│           ├── blacklist.model.js          # Token blacklist
│           └── interviewReport.model.js   # Interview report schema
│
└── Frontend/
    ├── index.html                         # Vite HTML entry
    ├── vite.config.js
    └── src/
        ├── main.jsx                       # React DOM root
        ├── App.jsx                        # Providers + Router
        ├── app.routes.jsx                 # Route definitions
        ├── style.scss                     # Global styles
        └── features/
            ├── auth/                      # 🔐 Auth Feature
            │   ├── auth.context.jsx       # Auth state (React Context)
            │   ├── auth.form.scss         # Auth form styles
            │   ├── components/
            │   │   └── Protected.jsx      # Route guard
            │   ├── hooks/
            │   │   └── useAuth.js         # Auth hook (login/register/logout)
            │   └── interview/             # Auth-scoped sub-feature
            │       ├── interview.context.jsx  # Interview state context
            │       ├── pages/
            │       │   ├── Login.jsx      # Login page
            │       │   └── Register.jsx   # Register page
            │       ├── services/
            │       │   └── auth.api.js    # Auth API calls (Axios)
            │       └── style/
            │           ├── home.scss      # Home page styles
            │           └── interview.scss # Interview page styles
            │
            └── interview/                 # 🎤 Interview Feature
                ├── hooks/
                │   └── useInterview.js    # Interview hook (generate/get reports)
                ├── pages/
                │   ├── Home.jsx           # Interview landing page
                │   └── Interview.jsx      # Live interview page
                └── services/
                    └── interview.api.js   # Interview API calls (Axios)
```

## 🛠️ Tech Stack

### Backend
- **Node.js** & **Express**
- **MongoDB** & **Mongoose**
- **JWT** (JSON Web Tokens) for authentication
- **Bcrypt.js** for secure password hashing
- **Multer** for file uploads
- **pdf-parse** for extracting text from resume PDFs
- **Google Gemini AI** for resume analysis

### Frontend
- **React** (Vite)
- **SCSS** for modern styling
- **React Router** for navigation
- **Lucide React** for icons
- **Axios** for HTTP requests

## 🏗️ Architecture

### Backend — 4-Layer Architecture

Follows a classic **Routes → Controllers → Services → Models** pattern:

1. **Routes**: Define API endpoints and attach middlewares.
2. **Controllers**: Handle request/response logic.
3. **Services**: Contain business logic (AI calls, data processing).
4. **Models**: Mongoose schemas for MongoDB collections.

### Frontend — Feature-Sliced Architecture

Each domain feature is a self-contained module with its own layers:

1. **Pages**: Main application screens (React components).
2. **Hooks**: Custom React hooks encapsulating state + API logic.
3. **Services**: Axios API call functions.
4. **Context**: React Context providers for shared state.
5. **Components**: Reusable UI elements (e.g., route guards).

Features:
- **`auth`** — Authentication (login, register, logout, session management).
- **`interview`** — AI interview report generation and viewing.

## 🔐 Authentication Flow

- **Protected Routes**: Implemented using a `Protected` component that checks for an active user session before granting access to specific pages.
- **Auto-Login**: The `AuthProvider` performs an automatic "get me" check on initial load to restore previous sessions.
- **Error Handling**: Comprehensive error handling in the API layer and hooks to provide a smooth user experience.

## 🤖 AI Integration

- **Gemini AI**: Integrated Google's Gemini AI to analyze resumes against job descriptions and generate preparation reports.
- **Resume Parsing**: Built-in support for uploading PDF resumes using `multer` and extracting content with `pdf-parse` to feed directly into the AI pipeline.
- **Structured JSON Output**: Uses advanced schema enforcement to ensure the AI always returns valid, parseable JSON.
- **Zod Validation**: All AI responses are validated using Zod schemas to ensure data integrity and type safety.
- **Interview Report Model**: A detailed schema to store match scores, technical/behavioral questions, skill gaps, and custom preparation plans.
- **Job Title Extraction**: Added `title` parsing to both the Zod schemas and database models to store the job designation for each interview report.

---

## 🔗 API Endpoints

### Authentication (`/api/auth`)
- `POST /register`: Registers a new user session.
- `POST /login`: Authenticates standard credential details.
- `GET /logout`: Securely clears active cookie tokens.
- `GET /get-me` `[Protected]`: Returns the currently active profile.

### AI Interview Prep (`/api/interview`)
- `POST /` `[Protected]`: Generates an AI interview strategy using a PDF resume, job description, and self-description.
- `GET /report/:interviewId` `[Protected]`: Fetches a single completed interview strategy report by its ID.
- `GET /report/getAllInterviewReports` `[Protected]`: Fetches a historical catalog of all interview reports generated by the user.

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB instance (local or Atlas)
- Google Gemini API key

### Setup

1. **Backend**:
   ```bash
   cd Backend
   npm install
   # Create .env file with MONGO_URI, JWT_SECRET, and GEMINI_API_KEY
   npm run dev
   ```

2. **Frontend**:
   ```bash
   cd Frontend
   npm install
   npm run dev
   ```
