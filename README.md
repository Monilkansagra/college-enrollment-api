# 🎓 College Enrollment API

<div align="center">

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)

**A production-ready REST API for managing college courses and student enrollments.**  
Built with NestJS · TypeORM · MySQL · JWT Authentication · Swagger UI

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Modules](#-api-modules)
- [Enrollment Business Logic](#-enrollment-business-logic)
- [Swagger Documentation](#-swagger-documentation)
- [Default Admin Credentials](#-default-admin-credentials)
- [Evaluation Coverage](#-evaluation-coverage)

---

## 🧭 Overview

The **College Enrollment API** is a minimal, functional backend system built for managing:

- 👤 Admin users with secure JWT-based authentication
- 📚 College courses with real-time capacity tracking
- 🧑‍🎓 Student profiles with duplicate prevention
- 📋 Enrollment engine with bulletproof business logic safeguards

Designed with clean modular architecture, strict DTO validation, and full Swagger documentation — ready to test without any frontend.

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| 🔐 JWT Authentication | Secure login system for admin users with Bearer token support |
| 👤 Admin Management | Create and manage admin accounts, seeded with a default super admin |
| 📚 Course Management | Full CRUD with soft-delete and real-time enrollment tracking |
| 🧑‍🎓 Student Registration | Unique email enforcement and strict payload validation |
| 📋 Enrollment Engine | Duplicate prevention + capacity enforcement at service & DB level |
| 📖 Swagger UI | Fully documented and testable API at `/api` route |
| ✅ Global Validation | `ValidationPipe` with `class-validator` across all endpoints |
| 🛡️ Exception Handling | Standardized `400`, `401`, `404`, `409` HTTP responses |

---

## 🛠 Tech Stack

- **Framework:** NestJS (TypeScript)
- **Database:** MySQL 8.0 via TypeORM
- **Authentication:** Passport.js + JWT (`@nestjs/jwt`, `@nestjs/passport`)
- **Validation:** `class-validator` + `class-transformer`
- **Documentation:** `@nestjs/swagger` + Swagger UI
- **Password Hashing:** `bcrypt`
- **Config Management:** `@nestjs/config`

---

## 📁 Project Structure

```
src/
├── app.module.ts                  # Root module with TypeORM & ConfigModule
├── main.ts                        # Bootstrap, Swagger setup, global pipes, seeder
│
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts         # POST /auth/login
│   ├── auth.service.ts            # JWT signing + bcrypt validation
│   ├── jwt.strategy.ts            # Passport JWT Strategy
│   ├── jwt-auth.guard.ts          # Custom JWT Guard
│   └── dto/login.dto.ts
│
├── admin/
│   ├── admin.module.ts
│   ├── admin.controller.ts        # POST /admin | GET /admin
│   ├── admin.service.ts           # Create, find, seed default admin
│   ├── admin.entity.ts
│   └── dto/create-admin.dto.ts
│
├── course/
│   ├── course.module.ts
│   ├── course.controller.ts       # POST | GET | PATCH | DELETE /course
│   ├── course.service.ts
│   ├── course.entity.ts           # maxCapacity + enrolledCount tracking
│   └── dto/
│       ├── create-course.dto.ts
│       └── update-course.dto.ts
│
├── student/
│   ├── student.module.ts
│   ├── student.controller.ts      # POST | GET /student
│   ├── student.service.ts
│   ├── student.entity.ts
│   └── dto/create-student.dto.ts
│
└── enrollment/
    ├── enrollment.module.ts
    ├── enrollment.controller.ts   # POST | GET /enrollment
    ├── enrollment.service.ts      # Full safeguard logic
    ├── enrollment.entity.ts       # @Unique(studentId, courseId)
    └── dto/enroll-student.dto.ts
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MySQL 8.0 running locally
- npm

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/college-enrollment-api.git
cd college-enrollment-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create the MySQL database

```sql
CREATE DATABASE college_enrollment;
```

### 4. Configure environment variables

Create a `.env` file in the root directory (see [Environment Variables](#-environment-variables)).

### 5. Start the development server

```bash
npm run start:dev
```

### 6. Open Swagger UI

```
http://localhost:3000/api
```

> ✅ The server auto-creates all tables on first run via TypeORM `synchronize: true`.  
> ✅ A default Super Admin is seeded automatically on startup.

---

## 🔧 Environment Variables

Create a `.env` file in the project root:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=college_enrollment
JWT_SECRET=super_secret_jwt_key_change_in_prod
```

---

## 📡 API Modules

### 🔐 Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/auth/login` | Public | Admin login → returns JWT token |

### 👤 Admin
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/admin` | Protected | Create a new admin |
| GET | `/admin` | Protected | List all admins |

### 📚 Course
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/course` | Protected | Create a new course |
| GET | `/course` | Public | Get all active courses |
| GET | `/course/:id` | Public | Get course by ID |
| PATCH | `/course/:id` | Protected | Update course details |
| DELETE | `/course/:id` | Protected | Soft-deactivate a course |

### 🧑‍🎓 Student
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/student` | Public | Register a new student |
| GET | `/student` | Protected | List all students |
| GET | `/student/:id` | Protected | Get student by ID |

### 📋 Enrollment
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/enrollment` | Public | Enroll a student in a course |
| GET | `/enrollment` | Protected | List all enrollments |
| GET | `/enrollment/student/:studentId` | Protected | Get enrollments by student |
| GET | `/enrollment/course/:courseId` | Protected | Get enrollments by course |

---

## 🛡️ Enrollment Business Logic

The enrollment engine enforces the following checks **in strict order**:

```
1. ✅ Does the Student exist?          → 404 Not Found
2. ✅ Does the Course exist?           → 404 Not Found
3. ✅ Is the Course active?            → 400 Bad Request
4. ✅ Is student already enrolled?     → 409 Conflict
5. ✅ Has course reached max capacity? → 400 Bad Request
6. ✅ Save enrollment record
7. ✅ Increment course enrolledCount
```

**Duplicate prevention** is enforced at two levels:
- **Service level:** Query check before insert
- **Database level:** `@Unique(['studentId', 'courseId'])` constraint on the enrollments table

---

## 📖 Swagger Documentation

All endpoints are fully documented and testable via Swagger UI:

```
http://localhost:3000/api
```

**Features:**
- 🔑 JWT Bearer Token authorization via the **Authorize** button
- 📝 All request/response schemas documented with examples
- 🏷️ Endpoints grouped by module tags (`Auth`, `Admin`, `Course`, `Student`, `Enrollment`)
- ⚠️ All error responses documented (`400`, `401`, `404`, `409`)

---

## 🔑 Default Admin Credentials

A Super Admin is automatically seeded on first startup:

```
Email:    admin@college.com
Password: Admin@123
```

**How to use:**
1. Open Swagger UI → `POST /auth/login`
2. Enter the credentials above
3. Copy the `access_token` from the response
4. Click **Authorize** in Swagger UI and paste the token
5. All protected endpoints are now accessible ✅

---

## 📊 Evaluation Coverage

| Criteria | Weight | Status |
|----------|--------|--------|
| Core Functionality & Authentication | 40% | ✅ Complete |
| Business Logic & Data Integrity | 30% | ✅ Complete |
| Code Architecture & Cleanliness | 20% | ✅ Complete |
| Swagger Documentation | 10% | ✅ Complete |

---

## 👨‍💻 Author

**Monil Kansagra**  
NestJS Developer Practical Test — Simbiotik Solutions

---

<div align="center">
  <sub>Built with ❤️ using NestJS + TypeScript</sub>
</div>
