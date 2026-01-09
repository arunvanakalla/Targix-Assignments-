# Product Backend APIs

A robust RESTful API built with Spring Boot for managing products with secure authentication and role-based access control. This application provides comprehensive product management features including CRUD operations, category management, search functionality, and user administration.

## 🚀 Features

### Authentication & Authorization
- **JWT-based Authentication**: Secure token-based authentication system
- **Role-Based Access Control (RBAC)**: Supports ADMIN and USER roles with granular permissions
- **Password Encryption**: BCrypt password hashing for secure credential storage
- **Stateless Sessions**: JWT tokens for stateless authentication

### Product Management
- **CRUD Operations**: Create, Read, Update, and Delete products
- **Category Management**: Organize products by categories
- **Search Functionality**: Search products by keywords
- **Product Filtering**: Filter products by category or user
- **Input Validation**: Comprehensive request validation using Jakarta Validation

### User Management
- **User Registration**: Public registration endpoint for new users
- **User Login**: Secure login with JWT token generation
- **Admin Functions**: Admin-only endpoints for user promotion
- **User-Product Association**: Track products created by each user

### Additional Features
- **Global Exception Handling**: Centralized error handling with custom exceptions
- **RESTful API Design**: Follows REST principles with proper HTTP status codes
- **Database Relationships**: Efficient entity relationships using JPA
- **Audit Fields**: Automatic timestamp tracking (created_at, updated_at)

## 🛠️ Tech Stack

- **Framework**: Spring Boot 4.0.1
- **Language**: Java 21
- **Database**: MySQL
- **Security**: Spring Security with JWT (JJWT 0.13.0)
- **ORM**: Spring Data JPA / Hibernate
- **Build Tool**: Maven
- **Libraries**:
  - Lombok (for reducing boilerplate code)
  - Jakarta Validation (for input validation)
  - Spring Boot DevTools (for development)

## 📋 Prerequisites

- Java 21 or higher
- Maven 3.6+
- MySQL 8.0+
- IDE (IntelliJ IDEA, Eclipse, or VS Code)

## ⚙️ Setup Instructions

### 1. Database Configuration

Create a MySQL database:
```sql
CREATE DATABASE targix_schema;
```

### 2. Application Configuration

Update `src/main/resources/application.properties` with your database credentials:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/targix_schema
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 3. Run the Application

```bash
# Using Maven
mvn spring-boot:run

# Or using the Maven wrapper
./mvnw spring-boot:run

# On Windows
mvnw.cmd spring-boot:run
```

The application will start on `http://localhost:8080`

## 📡 API Endpoints

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "password": "password123"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "john_doe"
}
```

### Product Endpoints

All product endpoints require authentication (JWT token in Authorization header).

#### Create Product
```
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Laptop",
  "price": 999.99,
  "description": "High-performance laptop",
  "categoryId": 1
}
```
**Access**: ADMIN, USER

#### Get All Products
```
GET /api/products
Authorization: Bearer <token>
```
**Access**: ADMIN, USER

#### Get Product by ID
```
GET /api/{id}
Authorization: Bearer <token>
```
**Access**: ADMIN, USER

#### Get Products by Category
```
GET /api/category/{categoryName}
Authorization: Bearer <token>
```
**Access**: ADMIN, USER

#### Get Products by User
```
GET /api/user/{username}
Authorization: Bearer <token>
```
**Access**: ADMIN only

#### Update Product
```
PUT /api/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Laptop",
  "price": 1099.99,
  "description": "Updated description",
  "categoryId": 1
}
```
**Access**: ADMIN, USER

#### Delete Product
```
DELETE /api/{id}
Authorization: Bearer <token>
```
**Access**: ADMIN, USER

#### Search Products
```
GET /api/search?keyword=laptop
Authorization: Bearer <token>
```
**Access**: ADMIN, USER

### Admin Endpoints

#### Create Admin
```
POST /api/admin/admin-login
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "username": "new_admin",
  "password": "admin_password"
}
```
**Access**: ADMIN only

#### Promote User to Admin
```
PUT /api/admin/promote/{username}
Authorization: Bearer <admin_token>
```
**Access**: ADMIN only

## 🔒 Security Features

### JWT Authentication Flow
1. User registers/logs in through `/api/auth/register` or `/api/auth/login`
2. Server validates credentials and generates JWT token
3. Client includes token in `Authorization: Bearer <token>` header for subsequent requests
4. JWT filter validates token on each request
5. Spring Security checks role-based permissions

### Role-Based Access Control
- **PUBLIC**: `/api/auth/register`, `/api/auth/login`
- **USER/ADMIN**: Most product endpoints
- **ADMIN ONLY**: Admin management endpoints, user-specific product queries

### Password Security
- Passwords are hashed using BCrypt before storage
- Never stored in plain text
- Secure password validation

## 🗄️ Database Schema

### Entities

#### User
- `id` (Integer, Primary Key)
- `userName` (String, Unique)
- `password` (String, Encrypted)
- `roles` (Set<Role>, Many-to-Many)
- `productList` (List<Product>, One-to-Many)
- `createdAt` (LocalDateTime)

#### Product
- `id` (Integer, Primary Key)
- `title` (String, Not Null)
- `price` (BigDecimal, Not Null)
- `description` (String, Not Null)
- `category` (Category, Many-to-One)
- `user` (User, Many-to-One)
- `createdAt` (LocalDateTime)
- `updatedAt` (LocalDateTime)

#### Category
- `id` (Integer, Primary Key)
- `name` (String, Unique, Not Null)
- `productList` (List<Product>, One-to-Many)

#### Role
- `id` (Integer, Primary Key)
- `name` (String, Enum: ADMIN, USER)

## 📁 Project Structure

```
src/main/java/com/Targix/Targix/Spring/project/
├── config/              # Security and JWT configuration
│   ├── JwtAuthFilter.java
│   ├── JwtUtils.java
│   └── SecurityConfig.java
├── controller/          # REST controllers
│   ├── AdminController.java
│   ├── AuthController.java
│   └── ProductController.java
├── DTO/                 # Data Transfer Objects
│   ├── AdminRequest.java
│   ├── LoginRequest.java
│   ├── LoginResponse.java
│   ├── ProductRequest.java
│   ├── ProductResponse.java
│   ├── RegisterRequest.java
│   └── RegisterResponse.java
├── exception/           # Custom exception handling
│   ├── DuplicateResourceException.java
│   ├── GlobalExceptionalHandler.java
│   └── ResourceNotFoundException.java
├── model/               # JPA entities
│   ├── Category.java
│   ├── Product.java
│   ├── Role.java
│   └── User.java
├── repo/                # Repository interfaces
│   ├── CategoryRepo.java
│   ├── ProductRepo.java
│   ├── RoleRepo.java
│   └── UserRepo.java
└── service/             # Business logic
    ├── AdminService.java
    ├── AuthService.java
    ├── CustomUserDetailsService.java
    └── ProductService.java
```

## 🔧 Key Technologies & Concepts

- **Spring Boot**: Rapid application development framework
- **Spring Security**: Authentication and authorization framework
- **JWT (JSON Web Tokens)**: Stateless authentication mechanism
- **JPA/Hibernate**: Object-relational mapping
- **RESTful API**: REST principles and best practices
- **Exception Handling**: Global exception handler for consistent error responses
- **Validation**: Jakarta Bean Validation for input validation
- **Dependency Injection**: Spring's IoC container

## 📝 Notes

- Default admin credentials can be configured in `application.properties`
- Database schema is auto-generated using `spring.jpa.hibernate.ddl-auto=update`
- JWT tokens should be stored securely on the client side
- All endpoints return appropriate HTTP status codes
- Error responses follow a consistent format via `ErrorResponse` DTO

## 🚧 Future Enhancements

- Pagination for product listings
- File upload for product images
- Product reviews and ratings
- Advanced filtering and sorting
- API documentation with Swagger/OpenAPI
- Unit and integration tests
- Docker containerization
- CI/CD pipeline setup

---

**Built with ❤️ using Spring Boot**


