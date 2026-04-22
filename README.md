# Digital Banking System

A secure, modular, and scalable **Digital Banking System Backend API** built with **Node.js, Express, and PostgreSQL**.
This project simulates core banking operations such as user management, account creation, and money transfers.

---

## Features

### User Management

* Register new users
* Fetch user details
* Secure password hashing (bcrypt)

### Account Management

* Create bank accounts
* Retrieve user accounts
* Update account balances

### Transaction System

* Transfer money between accounts
* Track transaction history
* Validate sufficient balance before transfers

### Security (Planned / Extendable)

* Password encryption
* JWT authentication (optional extension)
* Input validation layer

---

## Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL
* **ORM/Query:** Native `pg` library
* **Security:** bcrypt (password hashing)
* **Environment Management:** dotenv

---

## Project Structure

```
Digital_Banking_System/
│
├── controllers/
│   ├── userController.js
│   ├── accountController.js
│   └── transactionController.js
│
├── models/
│   ├── db.js
│   ├── userModel.js
│   ├── accountModel.js
│   └── transactionModel.js
│
├── routes/
│   ├── userRoutes.js
│   ├── accountRoutes.js
│   └── transactionRoutes.js
│
├── database/
│   └── schema.sql
│
├── app.js
├── package.json
└── .env
```

---

## Installation & Setup

### Clone the repository

```bash
git clone https://github.com/your-username/Digital_Banking_System.git
cd Digital_Banking_System
```

---

### Install dependencies

```bash
npm install
```

---

### Setup environment variables

Create a `.env` file in the root directory:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=banking_db
DB_PASSWORD=your_password_here
DB_PORT=5432

PORT=5000
```

---

### Setup PostgreSQL database

Run your schema file:

```bash
psql -U postgres -d banking_db -f database/schema.sql
```

---

### Start the server

```bash
npm start
```

or (for development)

```bash
npx nodemon app.js
```

---

## API Endpoints

---

### Users

#### Register User

```http
POST /api/users/register
```

**Body:**

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

---

#### Get User

```http
GET /api/users/:id
```

---

### Accounts

#### Create Account

```http
POST /api/accounts
```

#### Get User Accounts

```http
GET /api/accounts/user/:userId
```

#### Update Balance

```http
PUT /api/accounts/balance
```

---

### Transactions

#### Transfer Money

```http
POST /api/transactions/transfer
```

**Body:**

```json
{
  "from_account": 1,
  "to_account": 2,
  "amount": 500
}
```

---

#### Get Account Transactions

```http
GET /api/transactions/:accountId
```

---

## Business Logic Overview

### Transfer Flow

1. Validate sender account exists
2. Validate receiver account exists
3. Check sufficient balance
4. Deduct from sender
5. Credit receiver
6. Record transaction

---

## Security Considerations

* Passwords are hashed using **bcrypt**
* Input validation should be added (recommended: Joi or Zod)
* Future improvement: JWT authentication for protected routes

---

## Future Enhancements

* JWT Authentication system
* Transaction rollback using SQL transactions
* Admin dashboard (analytics)
* Deposit & withdrawal endpoints
* Frontend integration (React / Next.js)
* Cloud deployment (Render / AWS / Railway)

---

## Testing

You can test APIs using:

* Postman
* Insomnia
* Thunder Client (VS Code extension)

---

## Author

**Bethel Amadi**
Digital Product Architect | AI & FinTech Enthusiast
Founder @Klonix Pty Ltd

---

## Show Support

If you like this project:

* Star the repo
* Fork it
* Improve it
* Build on it

---

## License

This project is open-source and available under the MIT License.
