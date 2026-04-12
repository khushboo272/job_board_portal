# Job Board Portal

An end-to-end job board platform where users can browse, apply for jobs, and companies can post and manage job listings. The project is built with a modern tech stack and supports authentication, profile management, and admin features.

---

## Features

- User authentication (signup, login, logout)
- Browse, search, and filter jobs
- Apply for jobs
- Company registration and management
- Admin dashboard for managing jobs, companies, and applicants
- Profile management for users
- Responsive UI with React and Tailwind CSS

---

## Tech Stack

**Frontend:**
- React (with Vite)
- Redux Toolkit & Redux Persist
- React Router
- Tailwind CSS

**Backend:**
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT Authentication
- Multer (file uploads)
- Cloudinary (file storage)

---

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm
- MongoDB Atlas or local MongoDB instance

### Installation

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd Job-Board-Portal-main
   ```
2. **Install dependencies:**
   - Root (for both apps):
     ```sh
     npm install
     ```
   - Or individually:
     ```sh
     cd frontend && npm install
     cd ../backend && npm install
     ```

### Running the Project

- **Run both frontend & backend (recommended):**
  - From the project root:
    ```sh
    npm run dev
    ```
  - Frontend: [http://localhost:5173/](http://localhost:5173/) (or another port if 5173 is busy)
  - Backend: [http://localhost:8000/](http://localhost:8000/)
  - Health check: [http://localhost:8000/health](http://localhost:8000/health)

- **Run individually:**
  - Backend:
    ```sh
    cd backend && npm run dev
    ```
  - Frontend:
    ```sh
    cd frontend && npm run dev
    ```

### Environment Variables

- **Backend:**
  - Create a `.env` file in `backend/` (see `.env.example` if available)
  - Required:
    - `MONGO_URI` (MongoDB connection string)
    - `PORT` (default: 8000)

---

## Project Structure

```
Job-Board-Portal-main/
├── backend/
│   ├── controllers/      # Route handlers for jobs, users, companies, applications
│   ├── middlewares/      # Auth, file upload, etc.
│   ├── models/           # Mongoose schemas (User, Job, Company, Application)
│   ├── routes/           # Express routes for API endpoints
│   ├── utils/            # Utility functions (db, cloudinary, etc.)
│   └── index.js          # Main server entry point
├── frontend/
│   ├── src/
│   │   ├── components/   # React components (auth, admin, shared, ui, etc.)
│   │   ├── hooks/        # Custom React hooks
│   │   ├── redux/        # Redux slices and store
│   │   ├── utils/        # Frontend utilities
│   │   └── App.jsx       # Main app component
│   └── ...
├── README.md
└── package.json
```

---

## API Overview

The backend exposes RESTful APIs for:

- **/api/v1/user**: Register, login, logout, update profile
- **/api/v1/company**: Register, get, update companies
- **/api/v1/job**: Post, get, and manage jobs
- **/api/v1/application**: Apply for jobs, get applicants, update application status

---

## License

This project is licensed under the ISC License.
