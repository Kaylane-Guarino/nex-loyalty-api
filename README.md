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

## Development time

Start:

Friday: 09:00 → 20:00
Monday: 09:00 → 13:00

Total:

15 hours

```
```
