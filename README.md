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

### Security Features

* Email Verification
* Access Token Authentication
* Protected Routes
* User Validation
* Duplicate User Prevention

----------
### Day 3

### Product Management

* Create Product
* Get All Products
* Get Product By ID
* Update Product

### Product Variants

* Create Variant
* Update Variant

Variant Properties:

* Frame Size
* Border Option
* Glass Option
* Price
* Offer Price
* Stock Quantity

### Shopping Cart

* Add Item to Cart
* Get Cart
* Update Cart Quantity
* Remove Cart Item

### Order Management

#### Customer

* Place Order
* View My Orders
* View Order Details

#### Admin

* View All Orders
* Update Order Status

Supported Statuses:

* PENDING
* CONFIRMED
* PROCESSING
* SHIPPED
* DELIVERED
* CANCELLED

---

## Database Models

* User
* Product
* ProductVariant
* ProductImage
* Cart
* CartItem
* Order
* OrderItem

---

## Security

* Authentication Middleware
* Admin Authorization Middleware
* Customer Authorization Middleware
* CORS Enabled
* Protected API Endpoints
* Global 404 Handling

---

## Planned Features Todo

* Product Image Upload (AWS S3)
* Forgot Password
* Reset Password
* Razorpay Payment Integration
* Product Delete APIs
* Variant Delete APIs
* Admin Dashboard
* Customer Frontend
--------------
Yes. Since your Day 1–3 are already documented, you can continue like this:

# Day 4

### Customer Management

* Added customer pagination.
* Improved customer listing performance.
* Added customer detail page.
* Enabled navigation from customer list to customer details.
* Displayed customer profile information and address details.
* Added customer order history section.
* Improved customer management UI.

### Orders Management

* Improved order search experience.
* Added support for searching customers and orders more efficiently.
* Improved overall order visibility.

---

# Day 5

### Customer Experience Improvements

* Enhanced customer detail page layout.
* Added detailed order information inside customer profiles.
* Added order item visibility within customer orders.
* Improved customer information display with phone number, email, and address.

### Dashboard Improvements

* Updated customer registration metrics.
* Added new customer tracking based on registration date.
* Improved dashboard customer insights.

### Profile Management

* Enhanced profile page design.
* Added support for phone number management.
* Added support for address information.
* Improved profile editing experience.

---

# Day 6

### Orders Management

* Added order pagination.
* Improved order filtering experience.
* Added search support using:

  * Order Number
  * Customer Name
  * Phone Number
* Improved order management workflow.
* Added export functionality for order reports.
* Improved order page layout and usability.

### UI Improvements

* Fixed alignment issues across management pages.
* Improved responsiveness and consistency of admin screens.
* Enhanced data presentation for administrators.

---

# Day 7

### Product Management

* Integrated product image upload functionality.
* Connected product images with cloud storage.
* Added support for multiple image uploads.
* Added product image preview functionality.
* Integrated image uploads directly into product creation workflow.
* Improved product management experience.

### Media Management

* Added centralized product image handling.
* Improved image organization for products.
* Enabled seamless image upload and storage process.

### General Improvements

* Fixed multiple frontend issues.
* Fixed backend integration issues.
* Improved overall admin dashboard stability.
* Enhanced navigation and management workflows.
* Completed major customer, order, and product management enhancements.

--------

