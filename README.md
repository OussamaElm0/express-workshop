# Express Workshop

This repository contains a demo project for the final project of the **Express Workshop** hosted by **NGOS (New Generation Of SupMTI)**.

## About NGOS
NGOS is a university club that focuses on technology, innovation, and development. Connect with them:
- **[LinkedIn](https://www.linkedin.com/company/ngos-new-generation-of-supmti/)**
- **[Instagram](https://www.instagram.com/ngos.supmti/)**

## Features
- User authentication (JWT-based)
- User profile management
- Secure routes with middleware
- Environment variable configuration using dotenv
- RESTful API structure

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/OussamaElm0/express-workshop.git
   ```
2. Navigate to the project folder:
   ```sh
   cd express-workshop
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file and configure your environment variables:
   ```env
    SECRET_KEY=your_jwt_secret_key
    PORT=8080
    DB_URI=mongodb://localhost:27017/you_database
   ```
5. Start the server:
   ```sh
   npm start
   ```

## Usage
- Make API requests using tools like **Postman** or **cURL**.
- Ensure the **Authorization** header contains the JWT token for protected routes.

## Project Structure
```
express-workshop/
│-- authMiddleware.js
│-- authRoutes.js
│-- User.js
│-- authController.js
|-- start.sh
│-- .env
|-- .gitignore
│-- package.json
│-- README.md
```

## API Endpoints
| Method | Endpoint           | Description                  |
|--------|--------------------|------------------------------|
| GET    | `/users`           | Get all users                |
| GET    | `/users/:id `      | Get specific user by id      |
| GET    | `/users/counts`    | Get users counts (auth)      |
| POST   | `/auth/register`   | Register a new user          |
| POST   | `/auth/login`      | Login and receive JWT token  |
| PUT    | `/users/:id`       | Update user info (auth)      |
| DELETE | `/users/:id`       | Delete user by id (auth)     |

## Contributing
Feel free to submit issues or pull requests!
