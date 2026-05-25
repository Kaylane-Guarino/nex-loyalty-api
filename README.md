# Nex Loyalty API

Backend developed for the Nex Digital Full Stack technical challenge.

## Technologies

* Node.js
* TypeScript
* Express
* Sequelize
* MySQL
* JWT
* Bcrypt
* Multer
* XLSX

---

## Features

### Authentication

* User registration
* User login
* JWT authentication
* Route protection
* Admin validation middleware

### Transactions

* Spreadsheet upload
* Transaction creation from uploaded file
* Admin report
* Filters:

  * CPF
  * Product
  * Transaction date range
  * Amount range
  * Status

### Wallet

* Approved points balance
* User statement

---

## Project structure

```txt
src
├── config
├── controllers
├── middlewares
├── models
├── routes
├── seed
├── services
├── utils
├── app.ts
└── server.ts
```

---

## Installation

Install dependencies:

```bash
npm install
```

Create .env:

```env
PORT=3333

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=nex_loyalty
DB_PORT=3306

JWT_SECRET=secret
```

Run:

```bash
npm run dev
```

---

## Seed users

The application automatically creates:

Admin:

Email: [admin@nex.com](mailto:admin@nex.com)

Password: 123456

Users:

Email: [john@nex.com](mailto:john@nex.com)
Password: 123456

Email: [maria@nex.com](mailto:maria@nex.com)
Password: 123456

Email: [pedro@nex.com](mailto:pedro@nex.com)
Password: 123456

---

## Business Rules

### User Registration

* Users can register using:

  * Full name
  * E-mail
  * CPF
  * Password

* CPF and e-mail must be unique.

* Duplicate CPF or e-mail registration is not allowed.

---

### Spreadsheet Upload

The uploaded spreadsheet **does not create users**.

The spreadsheet only creates transactions for users already registered in the system.

Behavior:

* Existing CPF:

```txt
Transaction created
```

* Non-existing CPF:

```txt
Transaction ignored
```

Example:

If the spreadsheet contains:

```txt
CPF: 282.279.300-00
```

but this CPF is not registered in the Users table:

```txt
No transaction will be created.
```

---

### Wallet

Wallet balance only considers:

```txt
Approved transactions
```

Ignored statuses:

```txt
Rejected
Pending
```

---

### Access Rules

Admin:

* Upload spreadsheets
* View all transactions
* Apply filters

User:

* View only personal transactions
* View wallet balance
* Filter statement data

Users cannot access administrator routes.


---

## Development time

Start:

Friday: 09:00 → 20:00
Monday: 09:00 → 13:00

Total:

15 hours

```
```
