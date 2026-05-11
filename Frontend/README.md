# Resume Analyzer - Frontend

This is the frontend of the Resume Analyzer application, built with **React**, **Vite**, and **SCSS**.

## 🏗️ 4-Layer Architecture

The application follows a structured 4-layer approach for organized development:

### 1. UI Layer (`src/components`, `src/features/**/pages`)
Contains all the visual components and page layouts.
- **Components**: Reusable UI blocks like buttons, inputs, cards.
- **Pages**: Higher-level components that represent full routes (e.g., Login, Register).

### 2. Hook Layer (`src/hooks`)
Contains custom React hooks that encapsulate complex logic and stateful behavior that can be shared across multiple components.

### 3. State Layer (`src/context`)
Managed using React Context API for global state management.
- `auth.context.jsx`: Handles user authentication state, tokens, and profile data.
- `ai.context.jsx`: Handles the state of resume analysis and AI interactions.

### 4. API Layer (`src/services`)
Handles all external communication. It contains service functions for fetching data from the backend API, keeping the UI components clean of network logic.

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## 🎨 Styling

We use **SCSS** with a modular approach.
- Global styles are in `src/style.scss`.
- Component-specific styles are located alongside their respective components (e.g., `src/features/auth/auth.form.scss`).
- Design tokens and variables are maintained in `src/style/`.

## 🛠️ Features Implemented
- [x] User Registration UI
- [x] User Login UI
- [x] Responsive Design
- [x] 4-Layer Architectural Setup
- [ ] Resume Upload Integration
- [ ] AI Analysis Dashboard
