# FrameYard Backend
"FrameYard is a custom frame ecommerce platform. Users can upload their photos, choose frame styles, customize sizes, preview the final result, and place orders online."

# Why Am I Building This?

"Most local frame shops don't provide a digital customization experience. Customers often have to imagine the final output. I want to solve that by giving users a better online experience."

## Day 1

## Project Overview

FrameYard is a custom frame ecommerce platform that allows users to:

* Upload their images
* Select frame styles and sizes
* Preview customizations
* Place orders online

This repository contains the backend services for the FrameYard platform.

---

## Tech Stack

### Backend

* Node.js
* Express.js
* TypeScript

### Database

* Supabase PostgreSQL

### ORM

* Prisma ORM (v7)

### Package Manager

* npm

---

## Initial Setup Completed

### Supabase

* Supabase project created
* PostgreSQL database provisioned
* Connection strings configured
* Environment variables configured

### Prisma

* Prisma initialized
* Prisma configuration setup completed
* Prisma migration system configured
* Database connection verified

### Database
db Cretaed 
---

## Environment Variables

Required variables:

```env
DATABASE_URL=
DIRECT_URL=
SUPABASE_URL=
```

---

## Current Project Structure

```text
frameyard-backend
│
├── prisma
│   └── schema.prisma
│
├── src
│
├── .env
├── package.json
├── tsconfig.json
└── prisma.config.ts
```

---

## Milestone Status

### Completed

* [x] Supabase Setup
* [x] Prisma Setup
* [x] Database Connectivity

---

## Day 2

## Authentication Module Progress

### Completed Features
#### User Registration

* Created Register API
* Integrated Supabase Authentication
* User signup with email and password
* Email verification enabled
* User profile stored in PostgreSQL using Prisma

#### User Login

* Created Login API
* Integrated Supabase Sign In
* User authentication using email and password
* Email verification status sync
* Session and access token generation

#### Authentication Middleware

* Created protected route middleware
* Bearer token validation
* Supabase token verification
* User extraction from access token

#### User Profile

* Created Get Profile API
* Fetch logged-in user profile using access token
* Protected profile endpoint

#### Update Profile

* Created Update Profile API
* User can update:

  * Name
  * Phone Number
  * Address Line
  * Postal Code
  * City
  * State
  * Country
  * Gender

### Database

* Prisma connected to Supabase PostgreSQL
* User schema finalized
* Database migrations applied successfully

### APIs Completed

POST /auth/register

POST /auth/login

GET /auth/profile

PUT /auth/profile

### Security Features

* Email Verification
* Access Token Authentication
* Protected Routes
* User Validation
* Duplicate User Prevention

### Pending Authentication Features

POST /auth/forgot-password

POST /auth/reset-password

### Next Module

Product Module

* Product Schema Design
* Product CRUD APIs
* Product Images
* Product Categories
* Product Variants

----------

