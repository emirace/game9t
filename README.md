# MERN WebApp with React Vite and Node-Express

This is a full-stack web application built using the MERN stack, featuring **React Vite** on the frontend and **Node-Express** on the backend. The project is structured for scalability and maintainability, with separate folders for the frontend and backend.

---

## Features

- **Frontend**: Built with React, optimized using Vite for fast development and builds.
- **Backend**: Powered by Node.js and Express, serving APIs for frontend communication.
- **Database**: MongoDB for flexible and scalable data storage.
- **API Integration**: RESTful APIs to connect the backend with the frontend.
- **Modern Development**: Uses ES6+ syntax, React hooks, and state management.

---

## Tech Stack

### Frontend

- **React** with Vite
- **Tailwind CSS** (optional for styling)
- **Axios** for API requests

### Backend

- **Node.js** with Express
- **MongoDB** via Mongoose
- **dotenv** for environment variable management

---

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js (>= 16.x)
- MongoDB
- npm or yarn package manager

### Steps

1. Clone the repository:

```bash
   git clone <repository-url>
   cd <repository-folder>
```

2. Navigate to the frontend folder and install dependencies:

```bash
    cd frontend
    npm install
```

3. Navigate to the backend folder and install dependencies:

```bash
    cd ../backend
    npm install
```

Set up environment variables:

4. Create a .env file in the backend folder.
   Add the following variables:

```bash
    MONGO_URI=your db string
    PORT=5000
    JWT_SECRET=something secretgoes
    AWS_ACCESS_KEY_ID=
    AWS_SECRET_ACCESS_KEY=
    AWS_BUCKET_NAME=
    AWS_BUCKET_REGION=
    FRONTEND_URL=
    PAYSTACK_SECRET_KEY=
    NOWPAYMENTS_IPN_SECRET=
```

Create a .env file in the ffrontend folder.
Add the following variables:

```bash
VITE_NOWPAYMENT_KEY=
VITE_BACKEND_URL=
```

5. Run the application:

Start the backend server:

```bash
cd backend
npm run dev
```

Start the frontend development server:

```bash
cd ../frontend
npm run dev
```

Open the app in your browser at http://localhost:5173.
