# Resume Analyzer

A comprehensive Full-Stack application that analyzes resumes using AI to generate personalized interview preparation reports — including technical/behavioral questions, skill gaps, and a day-by-day study roadmap.

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
            │   ├── pages/
            │   │   ├── Login.jsx          # Login page
            │   │   └── Register.jsx       # Register page
            │   └── services/
            │       └── auth.api.js        # Auth API calls (Axios)
            │
            └── interview/                 # 🎤 Interview Feature
                ├── interview.context.jsx  # Interview state context
                ├── hooks/
                │   └── useInterview.js    # Interview hook (generate/get reports)
                ├── pages/
                │   ├── Home.jsx           # Interview setup / landing page
                │   └── Interview.jsx      # AI-generated report viewer
                ├── services/
                │   └── interview.api.js   # Interview API calls (Axios)
                └── style/
                    ├── home.scss          # Home page styles
                    └── interview.scss     # Interview report page styles
```

## 🛠️ Tech Stack

### Backend
- **Node.js** & **Express**
- **MongoDB** & **Mongoose**
- **JWT** (JSON Web Tokens) for authentication
- **Bcrypt.js** for secure password hashing
- **Multer** for file uploads
- **pdf-parse** for extracting text from PDF resumes
- **mammoth** for extracting text from DOCX resumes
- **Google Gemini AI** (`gemini-2.5-flash`) for AI report generation
- **Puppeteer** for PDF resume generation
- **Zod** for runtime validation of AI responses

### Frontend
- **React** (Vite)
- **SCSS** for modern styling
- **React Router** for navigation
- **Axios** for HTTP requests
- **React Toastify** for toast notifications

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

## ✨ Features

### 🔐 Authentication
- JWT-based login and registration with `HttpOnly` cookie sessions.
- **Auto-Login**: The `AuthProvider` performs an automatic `get-me` check on initial load to restore previous sessions.
- **Protected Routes**: A `Protected` route guard redirects unauthenticated users to the login page.
- **Token Blacklisting**: Logout invalidates tokens server-side to prevent reuse.
- **User Avatar**: Displays the first letter of the logged-in user's username as a profile avatar.

### 🤖 AI Interview Report Generation
- Upload a **PDF or DOCX** resume — both are parsed and fed directly into the AI pipeline.
- Provide an optional **self-description** text if no resume is available.
- Paste in the **job description** to tailor the analysis.
- **Gemini AI** generates a structured report including:
  - **Match Score** — percentage fit between your profile and the role.
  - **Technical Questions** — with interviewer intent and model answers.
  - **Behavioral Questions** — with interviewer intent and model answers.
  - **Skill Gaps** — ranked by severity (high / medium / low).
  - **Preparation Plan** — a day-by-day study roadmap.
  - **Job Title** — extracted from the job description.
- **Structured JSON Output**: Gemini is constrained with a JSON response schema to ensure valid, parseable output every time.
- **Zod Validation**: AI responses are validated against a Zod schema for type safety.

### 📝 AI Resume Generation
- Generate a polished, AI-crafted resume PDF from any interview report with a single click.
- The resume is tailored to the **job title and requirements** extracted from the original job description.
- **Per-report download** — each report card in the Past Reports section has its own download button.
- **Contextual placement** — the "Generate Resume" button is available both on the interview detail page sidebar and on each report card in the dashboard.
- Uses **Gemini AI** to write the resume content and **Puppeteer** to render it as a PDF.

### 📂 Resume Upload UX
- Drag & drop or click-to-upload file zone.
- After selecting a file, the upload zone is replaced with a **file preview card** showing the filename and file size.
- A remove button allows clearing the selection before submission.

### 📄 Report Viewer
- Navigate to `/interview/result/:id` to view a generated report.
- The report is fetched by ID from MongoDB and displayed in a full-page dashboard.
- **Tabbed navigation** between Technical Questions, Behavioral Questions, and Road Map sections.
- **Expandable Q&A cards** with interviewer intent and model answers.
- **Chronological Road Map** timeline UI for the preparation plan.
- **Match Score** circular progress indicator.
- **Skill Gap** severity badges.
- **Generate Resume** button in the sidebar to download an AI-tailored resume PDF for the viewed report.

### 📊 Past Reports History
- The Home page features a dashboard section listing all previously generated interview reports.
- Each report card shows the extracted job title, generation date, and a color-coded circular progress match score indicator.
- Each report card has a **download icon** to generate a resume PDF for that specific report without navigating away.
- Clicking any report card navigates the user directly to the report viewer dashboard.

---

## 🔗 API Endpoints

### Authentication (`/api/auth`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/register` | Public | Register a new user |
| `POST` | `/login` | Public | Login with email & password |
| `GET` | `/logout` | Public | Clear session cookie |
| `GET` | `/get-me` | 🔒 Protected | Get current user profile |

### AI Interview Prep (`/api/interview`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/` | 🔒 Protected | Generate an AI interview report (accepts resume file + job description) |
| `GET` | `/report/getAllInterviewReports` | 🔒 Protected | Get all reports for the current user |
| `GET` | `/report/:interviewId` | 🔒 Protected | Get a single report by ID |
| `POST` | `/resume/:interviewId` | 🔒 Protected | Generate and download an AI-tailored resume PDF |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB instance (local or [Atlas](https://www.mongodb.com/atlas))
- [Google Gemini API key](https://aistudio.google.com/app/apikey)

### Setup

1. **Backend**:
   ```bash
   cd Backend
   npm install
   ```
   Create a `.env` file in the `Backend/` directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GEMINI_API_KEY=your_gemini_api_key
   ```
   Then start the server:
   ```bash
   npm run dev
   ```
   The backend will run on **http://localhost:3000**.

2. **Frontend**:
   ```bash
   cd Frontend
   npm install
   npm run dev
   ```
   The frontend will run on **http://localhost:5173**.
