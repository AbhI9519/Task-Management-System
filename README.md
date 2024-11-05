# Task Management System

A full-featured **Task Management System** built with **Node.js** and **TypeScript**, featuring **JWT-based authentication**, **role-based access control**, **logging with log rotation**, and **environment-specific configuration**. This project is designed with production-ready practices and provides a flexible setup for different environments.

---

## Project Structure
src
├── config            # Configuration files
├── controllers       # Route controllers for all endpoints
├── middlewares       # Custom middlewares (e.g., authentication)
├── models            # Data models for tasks and users
├── services          # Business logic for authentication and tasks
├── utils             # Utility functions (e.g., logger)
├── app.ts            # Application setup and route definitions
└── index.ts          # Entry point for the server

---

## Features

- **User Authentication**: User registration and login with JWT-based token authentication.
- **Role-Based Access Control**: Permissions based on user roles (e.g., admin, user).
- **Task Management**: Create, retrieve, and update tasks.
- **Logging**: Event-based logging with daily log rotation for maintaining organized log files.
- **Environment-Specific Configuration**: Separate configurations for development and production environments.

---

## Prerequisites

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **TypeScript**
- **dotenv** for environment variable management

---

## Setup Instructions

1. **Clone the repository**:
   git clone <repository-url>
   cd Task-Management-System

2. Install dependencies:
    npm install


1. Configure Environment Variables:
   •	Create a .env file in the root directory with the following content:

        SECRET_KEY=your_secret_key
        PORT=5000

    •	Replace your_secret_key with a secure key for JWT signing.



Scripts

	•	build: Compiles TypeScript files into JavaScript in the dist directory.
	•	start: Starts the compiled JavaScript files from the dist folder (for production).
	•	dev: Runs the application in development mode with nodemon for automatic restarts on changes.
	•	prod: Runs the application in production mode with the NODE_ENV=production environment variable.


Running the Application

	1.	Development Mode: Automatically restarts on code changes.
        npm run dev

	2.	Production Mode: Uses the compiled JavaScript in the dist directory.
        npm run prod
    
    3.	Building the Project: Compiles TypeScript files.
        npm run build





API Documentation

Authentication Endpoints

	•	Register: POST /register
	•	Request: { "username": "example", "password": "password", "role": "user" }
	•	Response: { "message": "User registered successfully", "userId": "<id>" }
	•	Login: POST /login
	•	Request: { "username": "example", "password": "password" }
	•	Response: { "token": "<jwt_token>" }

User Endpoints

	•	Get Profile: GET /user/profile
	•	Headers: Authorization: Bearer <token>
	•	Response: User details
	•	Update Profile: PUT /user/profile
	•	Headers: Authorization: Bearer <token>
	•	Request: { "username": "newname" }
	•	Delete Account: DELETE /user/delete
	•	Headers: Authorization: Bearer <token>

Task Endpoints

	•	Create Task: POST /tasks
	•	Headers: Authorization: Bearer <token>
	•	Request: { "description": "Sample task" }
	•	Response: Task details
	•	Get User Tasks: GET /tasks
	•	Headers: Authorization: Bearer <token>
	•	Response: List of tasks
	•	Complete Task: PATCH /tasks/:taskId/complete
	•	Headers: Authorization: Bearer <token>
	•	Response: { "message": "Task completed" }

Logging and Log Rotation

The application uses an event-based logging system. Logs are created daily and automatically rotated. Older logs are moved to the archive directory for long-term storage.

	•	Log Directory: logs
	•	Archived Logs: logs/archive

Environment Management

This project is configured to support multiple environments using .env files.

	•	.env.development for development
	•	.env.production for production

You can specify the environment by setting NODE_ENV, and the application will load the respective .env file.




Acknowledgments

This project was created to demonstrate production-level practices in Node.js with TypeScript and serves as a template for scalable, secure RESTful API development.



---

This README file provides a detailed guide for setting up, running, and understanding the project, making it easier for any developer to get started with the Task Management System. Let me know if you'd like any further adjustments!
