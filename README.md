# 🗂️ Task Manager API

A RESTful API for task management built with authentication and database integration. This project was developed to practice backend architecture, authentication flows, and database operations using modern Node.js tooling.

## 🎯 Purpose of the Project

This project was built to practice backend fundamentals, including:

- REST API design
- CRUD operations
- Project structure organization
- Handling HTTP requests and responses

## 🚀 Features

- User authentication with JWT
- Protected routes
- Create, read, update and delete tasks
- Task ownership linked to authenticated users
- Secure API structure
- Prisma ORM for database management

## 💻 Technologies Used

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- JWT (JSON Web Token)
- REST API architecture

## 🔐 Authentication

This API uses JWT-based authentication.

### Flow:
1. User registers or logs in
2. Server returns a JWT token
3. Token must be sent in the request header:

   ```Authorization: Bearer YOUR_TOKEN```
   
## 🛠️ API Endpoints

- Get all tasks
`GET /tasks`
- Get task by ID
`GET /tasks/:id`
- Create a new task
`POST /tasks`
- Update a task
`PUT /tasks/:id`
- Delete a task
`DELETE /tasks/:id`

## 👤 Auth

- `POST /auth/register` → Register a new user  
- `POST /auth/login` → Login and receive JWT token 

## ⚙️ How to run locally

```bash
# Clone the repository
git clone https://github.com/xmahenri/task-manager-api.git

# Enter the project folder
cd task-manager-api

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Run database migrations (Prisma)
npx prisma migrate dev

# Start the server
npm run dev
```

## 🧑🏻‍💻 Author

**Made by:** [Marcos Henrique](https://github.com/xmahenri)
