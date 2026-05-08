# MERN Fullstack E-Commerce Boilerplate

Welcome to the MERN Fullstack E-Commerce Boilerplate repository! This project serves as a comprehensive educational demonstration of a modern, production-ready e-commerce application. It is designed to teach full-stack development concepts using Node.js, Express, MongoDB, and React.

## Repository Structure

This repository is organized into distinct applications to cleanly separate different parts of the ecosystem:

### 1. `web-app/`
This directory contains the core e-commerce platform, including the backend API, server-rendered customer views, and a decoupled React admin dashboard.
- **Backend (Node.js/Express)**: A robust MVC architecture featuring dual authentication (Session-based for web views, JWT-based for REST APIs), Mongoose models for data relationships, and file upload capabilities.
- **Customer Frontend (EJS)**: Server-side rendered views handling the shop catalog, persistent shopping cart, and checkout process.
- **Admin Dashboard (React)**: Located inside `web-app/react-app/`, this is a modern Single Page Application (SPA) built with Vite and Material UI (MUI). It provides a premium interface for managing inventory, categories, and orders by consuming the backend's secure REST API.

👉 **For full setup instructions, API documentation, and architectural details, see the [Web App README](./web-app/README.md).**

### 2. `mobile-app/`
This directory is currently an empty placeholder reserved for the future development of a mobile application client (e.g., using React Native). Once built, it will integrate seamlessly with the `web-app`'s JWT-protected REST APIs to provide a native shopping experience.

## Getting Started

To get started with the project, navigate to the `web-app` directory and follow the comprehensive setup instructions:

```bash
# Navigate to the web application directory
cd web-app

# Install backend dependencies
npm install

# (Optional) Seed the database with initial products and an admin user
node seed.js

# Start the development server
npm run dev
```

To run the React Admin Panel, open a separate terminal and navigate to `web-app/react-app/`. Follow the instructions in the `web-app/README.md` for running the frontend.
