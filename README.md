# Rule Engine Application

This repository contains the source code for a full-stack Rule Engine application with separate frontend and backend components. The application allows users to create, combine, evaluate, and modify rules.

## Table of Contents

1. Project Overview
2. Frontend
    - Tech Stack
    - Features
    - Setup Instructions
3. Backend
    - Tech Stack
    - Features
    - Setup Instructions
4. Design Choices

## Project Overview

This project implements a Rule Engine that allows users to create business rules, combine them, evaluate them, and modify existing rules. The application consists of two main components:

1. Frontend: Built with React.js, this provides an intuitive UI for users to interact with the Rule Engine.
2. Backend: Built with Node.js and Express, this provides the API to handle the business logic and database 
   interactions.

## Frontend

### Frontend Tech Stack

- React.js: Component-based library for building user interfaces.
- React Router: To handle client-side routing and navigation.
- Bootstrap: For responsive and professional UI design.
- Axios: For making API requests.
- CSS (Custom + Bootstrap): For styling the components and layout.

### Frontend Features
- Create Rule: A form to create new rules.
- Combine Rules: An interface to combine multiple rules.
- Evaluate Rule: A feature to test and evaluate the created rules.
- Modify Rule: An option to update or delete existing rules.

### Frontend Setup Instructions

#### Prerequisites
- Node.js (v14+): Download and install from here
- npm or yarn: npm is bundled with Node.js, but you can also install yarn if preferred.

#### Dependencies
Install the following dependencies by running:
```bash
cd frontend
npm install

#or

yarn install
```
Start the Frontend Server
To start the frontend (React) development server, run:
```bash
npm start

#or

yarn start
```

This will start the application on `http://localhost:3000`.


## Backend

### Backend Tech Stack

- Node.js: JavaScript runtime for building the backend API.
- Express.js: A lightweight framework to create APIs.
- MongoDB: NoSQL database for storing rule data.
- Mongoose: ODM for MongoDB.
- Cors: For handling cross-origin requests.
- Body-parser: Middleware for parsing incoming request bodies.
- Dotenv: For environment variable management.

### Backend Features

- API Endpoints:
    - Create, read, update rules.
    - Combine multiple rules.
    - Evaluate rules based on user input.
- Error Handling: Graceful handling of exceptions and providing informative error messages.

### Backend Setup Instructions

#### Prerequisites
- Node.js (v14+)
- MongoDB: You can either run MongoDB locally or use MongoDB Atlas for a cloud-based solution.

#### Dependencies
Install the following dependencies by running:
```bash
cd backend
npm install

#or

yarn install
```
Setup Environment Variables
Create a `.env` file in the backend root directory and add the following environment variables:
```bash
PORT=5000
MONGO_URI=<your-mongo-db-uri>
```
Start the Backend Server
To start the backend server, run:
```bash
npm start

#or

yarn start
```

This will start the backend server on `http://localhost:5000`.


## Design Choice

### Frontend Design

1. Component-Based Architecture: Each feature (create, combine, evaluate, modify rules) is split into separate 
   components to ensure reusability and maintainability.
2. React Router for Navigation: The application uses React Router to enable seamless navigation between 
   different sections like Create Rule, Combine Rules, Evaluate Rule, and Modify Rule.
3. Bootstrap for UI: Bootstrap is used for layout and responsive design, ensuring the application works well 
   across different screen sizes.
4. Axios for API Requests: Axios is used for interacting with the backend API. It handles CRUD operations 
   related to the rules.


### Backend Design

1. REST API: The backend follows REST principles, making it easy to interact with from any client.
2. Separation of Concerns: The business logic (rule creation, modification, combination, evaluation) is 
   decoupled from the API routes, ensuring clean code and easy scalability.
3. MongoDB for Flexibility: The application uses MongoDB to store rules. This allows for flexibility in the 
   schema as the rules can have varying structures.
4. Error Handling: Comprehensive error handling is implemented to catch and handle errors gracefully, providing 
   clear feedback to the user.