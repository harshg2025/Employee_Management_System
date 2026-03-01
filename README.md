🚀 Employee Management System

Full Stack HR Admin Panel using Angular + .NET 8 + MySQL

📌 Project Overview

The Employee Management System is a full-stack web application designed to help HR departments efficiently manage employee records.

This system allows HR administrators to perform complete CRUD (Create, Read, Update, Delete) operations on employee data through a secure and modern admin panel.

The application is built using:

🔹 Backend: ASP.NET Core (.NET 8 Web API)

🔹 Frontend: Angular

🔹 Database: MySQL

The project follows a clean architecture structure with separate frontend and backend folders.

🏗️ Project Architecture
Project_Jack
│
├── backend
│   └── EmployeeManagement.API
│
└── frontend
    └── Angular Application
Backend Architecture

Controllers

Services

Repositories

DTOs

Models

DbContext

JWT Authentication

Role-based Authorization (HR Only)

Frontend Architecture

Core Module

Services (API integration)

Components

Dashboard

Employee List

Add/Edit Employee Form

Routing Module

Guards (HR Protection)

✨ Features
🔐 Authentication & Security

HR Admin Login

JWT Token Authentication

Role-Based Authorization

Protected Routes

CORS Configuration

👩‍💼 Employee Management

Add New Employee

View All Employees

Update Employee Details

Delete Employee

Form Validation

Error Handling

Loading Indicators

📊 Dashboard

HR Admin Control Panel

Employee Overview

Clean UI with Responsive Design

🗄️ Database Design

The system uses MySQL as the relational database.

Employee Table Fields

Id (Primary Key)

FirstName

LastName

Email

Phone

Department

Salary

DateOfJoining

Entity Framework Core is used for database migrations and ORM mapping.

⚙️ Technologies Used
Backend

ASP.NET Core

Entity Framework Core

JWT Authentication

Repository Pattern

RESTful API

Frontend

Angular

TypeScript

Angular Router

Reactive Forms

HTTP Client

Database

MySQL
