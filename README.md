
---
### ## Backend Folder Structure Guide

This guide explains the role of each directory in your project, helping you keep your code organized and scalable.



### ### `src`
This is the **main source code** folder. All of your application's logic, features, and configurations live inside this directory.

---
### ### `src/modules` (or `src/features`)
This is the core of your application, organized by feature. Each subfolder here is a self-contained feature of your app.

* **What goes here**: A folder for each feature (e.g., `auth`, `polls`, `users`). Inside each feature folder, you'll have:
    * `*.routes.ts`: Defines the API endpoints for that feature.
    * `*.controller.ts`: Handles incoming requests and sends back responses.
    * `*.service.ts`: Contains the main business logic and interacts with the database.

---
### ### `src/lib` (Library) 🛠️
Think of this as your application's **shared toolbox**. It's for initializing and exporting major, reusable clients or foundational code.

* **What goes here**:
    * Database clients (`prisma.ts`, `redis.ts`).
    * Connections to external services (e.g., an AWS S3 client).
    * Any foundational "tool" that your services will use.

---
### ### `src/config` (Configuration) ⚙️
This folder is your app's **settings menu**. It manages environment variables and other configuration values that might change between development and production.

* **What goes here**:
    * Code that loads variables from your `.env` file (`JWT_SECRET`, `DATABASE_URL`).
    * Application constants and settings (e.g., logging levels, port numbers).

---
### ### `src/middlewares`
This folder contains functions that **run in the middle** of a request-response cycle. They are perfect for tasks that need to happen before your main logic.

* **What goes here**:
    * Authentication checks (`isAuthenticated.ts`).
    * Global error handlers (`errorHandler.ts`).
    * Request loggers.

---
### ### `src/utils` (Utilities) 🇨🇭
This is for **small, reusable helper functions**. Think of it as a drawer for your Swiss Army knives—simple tools that do one specific job.

* **What goes here**:
    * Formatting functions (`formatDate.ts`).
    * Simple generators (`generateRandomString.ts`).
    * Any small, stateless helper function.
