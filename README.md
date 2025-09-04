# Quora Mock API - Express Server

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.19.2-blue.svg)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-8.16.3-purple.svg)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

A RESTful API server built with Express.js and PostgreSQL that mimics Quora's question and answer functionality. This project provides endpoints for managing questions and answers with proper validation and error handling.

## 📋 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **CRUD Operations**: Create, read, update, and delete questions
- **Answer Management**: Add and manage answers for questions
- **Search Functionality**: Search questions by title and category
- **Data Validation**: Input validation for all endpoints
- **Error Handling**: Comprehensive error handling with detailed messages
- **PostgreSQL Integration**: Robust database operations with connection pooling

## 🛠 Technologies Used

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **PostgreSQL** - Relational database
- **pg** - PostgreSQL client for Node.js
- **Nodemon** - Development server with auto-restart

## 📦 Installation

### Prerequisites

- Node.js (version 18 or higher)
- PostgreSQL (version 12 or higher)
- npm or yarn package manager

### Step-by-Step Setup

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd backend-skill-checkpoint-express-server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure database connection**
   
   Update the database connection string in `utils/db.mjs`:
   ```javascript
   const connectionPool = new Pool({
     connectionString: "postgresql://username:password@localhost:5432/database_name",
   });
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

   The server will start on `http://localhost:4000`

## 🗄 Database Setup

### Create Database and Tables

1. **Connect to PostgreSQL**
   ```bash
   psql -U postgres
   ```

2. **Create database**
   ```sql
   CREATE DATABASE "quora-mock";
   ```

3. **Create tables**
   ```sql
   -- Questions table
   CREATE TABLE questions (
       id SERIAL PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       description TEXT NOT NULL,
       category VARCHAR(100) NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   -- Answers table
   CREATE TABLE answers (
       id SERIAL PRIMARY KEY,
       content TEXT NOT NULL,
       question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

## 🚀 Usage

### Basic API Testing

Test the server is running:
```bash
curl http://localhost:4000/test
```

Expected response:
```json
"Server API is working 🚀"
```

### Example API Calls

#### Create a Question
```bash
curl -X POST http://localhost:4000/questions \
  -H "Content-Type: application/json" \
  -d '{
    "title": "How to learn JavaScript?",
    "description": "I am a beginner and want to learn JavaScript programming.",
    "category": "programming"
  }'
```

#### Get All Questions
```bash
curl http://localhost:4000/questions
```

#### Search Questions
```bash
curl "http://localhost:4000/questions?title=javascript&category=programming"
```

#### Add an Answer
```bash
curl -X POST http://localhost:4000/questions/1/answers \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Start with basic concepts and practice regularly."
  }'
```

## 📡 API Endpoints

### Questions

| Method | Endpoint | Description | Required Fields |
|--------|----------|-------------|-----------------|
| `POST` | `/questions` | Create a new question | `title`, `description`, `category` |
| `GET` | `/questions` | Get all questions or search | Query params: `title`, `category` |
| `GET` | `/questions/:id` | Get a specific question | `id` (path parameter) |
| `PUT` | `/questions/:id` | Update a question | `title`, `description`, `category` |
| `DELETE` | `/questions/:id` | Delete a question and its answers | `id` (path parameter) |

### Answers

| Method | Endpoint | Description | Required Fields |
|--------|----------|-------------|-----------------|
| `POST` | `/questions/:id/answers` | Add an answer to a question | `content` (max 100 chars) |
| `GET` | `/questions/:id/answers` | Get all answers for a question | `id` (path parameter) |
| `DELETE` | `/questions/:id/answers` | Delete all answers for a question | `id` (path parameter) |

### Request/Response Examples

#### Create Question Response
```json
{
  "message": "Question created successfully."
}
```

#### Get Questions Response
```json
{
  "data": [
    {
      "id": 1,
      "title": "How to learn JavaScript?",
      "description": "I am a beginner and want to learn JavaScript programming.",
      "category": "programming",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### Error Response
```json
{
  "message": "Unable to create questions",
  "error": "duplicate key value violates unique constraint"
}
```

## ⚠️ Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Invalid input data or missing required fields
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Database or server errors

All error responses include:
- Descriptive error message
- Detailed error information (in development)
- Proper HTTP status codes

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Add proper error handling
- Include input validation
- Write clear commit messages
- Test your changes thoroughly

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

- **Express.js** - Web framework
- **PostgreSQL** - Database system
- **Node.js** - Runtime environment
- **freeCodeCamp** - README best practices guide

## 📞 Support

If you encounter any issues or have questions:

1. Check the error logs in the console
2. Verify your database connection
3. Ensure all required fields are provided
4. Open an issue on GitHub

---

**Happy Coding! 🚀**
