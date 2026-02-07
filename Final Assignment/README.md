# Project Management System

A full-stack web application for managing project tickets, tasks, and team collaboration. Built with Spring Boot (Backend) and React (Frontend), featuring role-based access control, ticket management, user administration, and real-time updates.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [User Roles & Permissions](#user-roles--permissions)
- [Default Credentials](#default-credentials)
- [Development Notes](#development-notes)

## ✨ Features

### Authentication & Authorization
- User registration with admin approval workflow
- JWT-based authentication
- Role-based access control (ADMIN, EMPLOYEE)
- Secure password management
- Profile management with avatar upload

### Ticket Management
- Create, update, and delete tickets (Admin only)
- Assign tickets to employees
- Track ticket status through workflow stages
- Filter tickets by status, label, assigned user
- View ticket details with rich text descriptions
- Comments system with rich text editor
- Status workflow: TODO → PAUSED → IN_PROGRESS → PR_REVIEW → READY_TO_DEPLOY → DEPLOYED_DONE
- Restrict updates on DEPLOYED_DONE tickets

### User Management (Admin)
- Approve/reject pending user registrations
- Promote users to admin role
- View all active users
- Delete/deactivate users
- Reset user passwords
- Transfer tickets when deleting users

### Dashboard
- Overview of ticket statistics
- Quick access to assigned tickets
- Ticket counts by status

### Labels & Status Management
- Predefined labels: BUG, FEATURE, TASK, IMPROVEMENT, SUPPORT
- Customizable ticket statuses
- Color-coded status indicators

## 🛠 Tech Stack

### Backend
- **Framework**: Spring Boot 4.0.1
- **Language**: Java 21
- **Database**: MySQL
- **ORM**: Spring Data JPA / Hibernate
- **Security**: Spring Security with JWT
- **Build Tool**: Maven
- **Other**: Lombok, Validation API

### Frontend
- **Framework**: React 19.2.3
- **UI Library**: Ant Design 6.2.0
- **State Management**: React Query (@tanstack/react-query)
- **Routing**: React Router DOM 6.30.3
- **HTTP Client**: Axios 1.13.2
- **Rich Text Editor**: Quill 2.0.3
- **Form Handling**: React Hook Form 7.71.0
- **Build Tool**: Create React App

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Java 21** or higher
- **Maven 3.6+**
- **Node.js 16+** and **npm** or **yarn**
- **MySQL 8.0+**
- **Git**

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Project-Management-System
```

### 2. Database Setup

1. Create a MySQL database:
```sql
CREATE DATABASE project_management_system;
```

2. Update database credentials in `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/project_management_system
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 3. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Build the project:
```bash
mvn clean install
```

3. The application will automatically:
   - Create database tables (via Hibernate DDL auto-update)
   - Initialize default roles (ADMIN, EMPLOYEE)
   - Initialize default statuses (TODO, PAUSED, IN_PROGRESS, PR_REVIEW, READY_TO_DEPLOY, DEPLOYED_DONE)
   - Initialize default labels (BUG, FEATURE, TASK, IMPROVEMENT, SUPPORT)
   - Create default admin user (if not exists)

### 4. Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## ⚙️ Configuration

### Backend Configuration

Edit `backend/src/main/resources/application.properties`:

```properties
# Server Configuration
server.port=8080

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/project_management_system
spring.datasource.username=root
spring.datasource.password=your_password

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Default Admin Credentials
app.admin.email=admin@targix.com
app.admin.username=admin
app.admin.password=Admin@123

# JWT Configuration
jwt.secret=a-very-long-random-secret-key-at-least-32-chars-1234567890
jwt.expiration-ms=36000000

# File Upload Directory
app.uploads.dir=C:/Arun/SpringBoot practice/Project-Management-System/uploads
```

**Important**: 
- Change `app.uploads.dir` to your desired upload directory path
- Change `jwt.secret` to a secure random string (at least 32 characters)
- Update database credentials to match your MySQL setup

### Frontend Configuration

The frontend API base URL is configured in `frontend/src/services/api.js`. By default, it points to:
```
http://localhost:8080/api
```

Update this if your backend runs on a different port or host.

## 🏃 Running the Application

### Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Run the Spring Boot application:
```bash
mvn spring-boot:run
```

Or run the main class:
```bash
java -jar target/Project-Management-System-0.0.1-SNAPSHOT.war
```

The backend will start on `http://localhost:8080`

### Frontend

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Start the development server:
```bash
npm start
```

The frontend will start on `http://localhost:3000` and automatically open in your browser.

## 📁 Project Structure

```
Project-Management-System/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/targix/Project/Management/System/
│   │   │   │   ├── config/          # Security, JWT, CORS configuration
│   │   │   │   ├── controller/     # REST API controllers
│   │   │   │   ├── dto/             # Data Transfer Objects
│   │   │   │   ├── exceptions/      # Custom exception handlers
│   │   │   │   ├── model/           # Entity models
│   │   │   │   ├── repo/            # JPA repositories
│   │   │   │   ├── service/         # Business logic
│   │   │   │   └── data/            # Data initializer
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/                    # Unit tests
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── components/             # Reusable components
│   │   ├── context/                 # React context (Auth)
│   │   ├── pages/                   # Page components
│   │   │   ├── admin/               # Admin pages
│   │   │   ├── auth/                # Login/Register
│   │   │   ├── dashboard/           # Dashboard
│   │   │   ├── profile/             # User profile
│   │   │   └── tickets/             # Ticket management
│   │   ├── services/                # API service layer
│   │   └── styles/                  # CSS files
│   ├── public/
│   └── package.json
├── uploads/                         # File uploads directory
│   └── avatars/                     # User profile pictures
└── docs/                            # Documentation
    └── erdiagram.md                 # Database ER diagram
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### User Management
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/{id}` - Update user
- `POST /api/users/profile/avatar` - Upload profile picture
- `PUT /api/users/profile/password` - Change password
- `GET /api/users/tickets` - Get tickets with filters
- `GET /api/users/tickets/{id}` - Get ticket by ID
- `PUT /api/users/tickets/{id}/status` - Update ticket status
- `GET /api/users/tickets/{ticketId}/comments` - Get comments
- `POST /api/users/tickets/{ticketId}/comments` - Create comment

### Admin Endpoints
- `GET /api/admin/pending-users` - Get pending user approvals
- `PUT /api/admin/approve/{id}` - Approve user as employee
- `PUT /api/admin/approve-admin/{id}` - Approve user as admin
- `PUT /api/admin/reject/{id}` - Reject user registration
- `GET /api/admin/users` - Get all active users
- `GET /api/admin/users/{id}` - Get user by ID
- `DELETE /api/admin/users/{id}` - Delete user
- `PUT /api/admin/users/{id}/password` - Reset user password
- `POST /api/admin/tickets` - Create ticket
- `PUT /api/admin/tickets/{id}` - Update ticket
- `DELETE /api/admin/tickets/{id}` - Delete ticket

### Labels, Statuses, Roles
- `GET /api/labels` - Get all labels
- `GET /api/statuses` - Get all statuses
- `GET /api/roles` - Get all roles

All admin endpoints require `ADMIN` role. Most endpoints require authentication via JWT token.

## 🗄 Database Schema

### Core Entities

- **users**: User accounts with roles and status
- **roles**: User roles (ADMIN, EMPLOYEE)
- **tickets**: Project tickets/tasks
- **status**: Ticket statuses
- **labels**: Ticket categories
- **comments**: Ticket comments
- **attachments**: Ticket attachments (if enabled)

### Relationships

- User → Role: Many-to-One (each user has one role)
- User → Tickets: One-to-Many (created, assigned, updated)
- Ticket → Status: Many-to-One
- Ticket → Label: Many-to-One
- Ticket → Comments: One-to-Many
- Comment → User: Many-to-One (author)

See `docs/erdiagram.md` for detailed ER diagram.

## 👥 User Roles & Permissions

### ADMIN
- Create, update, and delete tickets
- Assign tickets to employees
- Approve/reject user registrations
- Promote users to admin
- Delete/deactivate users
- Reset user passwords
- View all tickets
- Update ticket status to any stage
- Cannot update DEPLOYED_DONE tickets

### EMPLOYEE
- View assigned tickets
- Update status of assigned tickets (limited workflow)
- Add comments to assigned tickets
- Update own profile
- Cannot create tickets
- Cannot update status to READY_TO_DEPLOY or DEPLOYED_DONE

### User Status Flow
- **PENDING**: New registration, awaiting admin approval
- **ACTIVE**: Approved and can login
- **REJECTED**: Registration rejected by admin
- **INACTIVE**: Deleted/deactivated user

## 🔐 Default Credentials

After first run, the system creates a default admin user:

- **Email**: `admin@targix.com`
- **Username**: `admin`
- **Password**: `Admin@123`

**⚠️ Important**: Change the default admin password in production!

## 📝 Development Notes

### Backend Architecture
- RESTful API design
- Service layer pattern for business logic
- DTO pattern for data transfer
- JWT authentication with Spring Security
- Exception handling with custom exceptions
- File upload support for avatars

### Frontend Architecture
- Component-based React architecture
- React Query for server state management
- Context API for authentication
- Protected routes with role-based access
- Responsive design with Ant Design
- Rich text editing with Quill

### Key Features Implementation
- **Ticket Status Workflow**: Enforced in both backend and frontend
- **DEPLOYED_DONE Protection**: Tickets in this status cannot be updated
- **User Assignment**: Only active employees can be assigned to tickets
- **Comments**: Only assigned users or admins can comment
- **File Uploads**: Profile pictures stored in `uploads/avatars/`

### Database Migration
- Uses Hibernate `ddl-auto=update` for automatic schema updates
- Initial data loaded via `DataInitializer` on startup
- Manual migration may be required for production

### Security Considerations
- JWT tokens expire after 10 hours (configurable)
- Passwords are hashed using BCrypt
- CORS configured for frontend origin
- Role-based access control on all endpoints
- File upload validation and size limits

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is part of an internship project at Targix.

## 👨‍💻 Author

Developed as part of the Targix internship program.

---

For more details, refer to the inline code documentation and API comments.

