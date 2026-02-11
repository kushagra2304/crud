# Notes App — Full Stack JWT CRUD

A simple, secure, and scalable **Full-Stack Notes/Tasks Web App** built with React, Node.js, Express, and MySQL.  
Implements **JWT Authentication, Protected Dashboard, and Full CRUD operations**.

---

## 📌 Features

- Secure Signup & Login (JWT)
- Protected Dashboard
- Create, Read, Update, Delete Notes/Tasks
- User-specific data
- Search & Filter tasks
- Responsive UI
- Secure Logout
- Error handling & validation

---

## 🛠 Tech Stack

**Frontend**
- React (Vite)
- TailwindCSS
- Axios
- React Router DOM

**Backend**
- Node.js
- Express.js
- MySQL
- JWT Authentication
- bcrypt (Password hashing)
- dotenv, CORS

---

## 🔐 Security

- Password hashing (bcrypt)
- JWT authentication
- Protected API routes
- Token validation middleware
- Secure login/logout flow

--- 
## File Structure
frontend/
backend/


---

## ⚙️ API Routes

**Auth**
- `POST /api/auth/signup`
- `POST /api/auth/login`

**User**
- `GET /profile`

**Tasks**
- `GET /tasks`
- `POST /tasks`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`

> All task routes require JWT token.

---

## ▶️ Run Locally

### 1. Clone
git clone <repo-link>
cd project 

### 2. Backend
cd backend
npm install
npm run dev


Create `.env`


PORT=5000
JWT_SECRET=your_secret
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=dbname


### 3. Frontend


cd frontend
npm install
npm run dev

Create .env:
VITE_API_URL=http://localhost:5173


App → `http://localhost:5173`

---


## 👨‍💻 Author

**Kushagra Sharma**  
Fullstack Developer — React • Node • JWT • MySQL
