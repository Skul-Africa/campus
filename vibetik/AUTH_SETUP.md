# Authentication Setup Guide

## Installation

First, run the installation script to install all required authentication packages:

```bash
bash install-auth.sh
```

Or manually install:
```bash
npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt class-validator class-transformer @types/bcrypt @types/passport-jwt
```

## Environment Variables

Update your `.env` file with these variables (already added):
```
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRATION=3600
```

## API Endpoints

### 1. Sign Up
**POST** `/auth/signup`

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

### 2. Login
**POST** `/auth/login`

Request body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

### 3. Get Profile (Protected Route)
**GET** `/auth/profile`

Headers:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Response:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "john@example.com",
  "name": "John Doe"
}
```

## Using JWT Authentication in Other Routes

To protect a route with JWT authentication, use the `JwtAuthGuard`:

```typescript
import { UseGuards, Get, Request } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller('protected')
export class SomeController {
  @Get('route')
  @UseGuards(JwtAuthGuard)
  protectedRoute(@Request() req) {
    // req.user contains the authenticated user
    console.log(req.user);
    return { message: 'This is protected' };
  }
}
```

## Testing with cURL

### Sign Up
```bash
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Get Profile
```bash
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## File Structure

```
src/
├── auth/
│   ├── dto/
│   │   ├── login.dto.ts
│   │   ├── signup.dto.ts
│   │   └── auth-response.dto.ts
│   ├── guards/
│   │   └── jwt-auth.guard.ts
│   ├── strategies/
│   │   └── jwt.strategy.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── users/
│   ├── users.service.ts
│   └── users.module.ts
└── entities/
    └── user.entity.ts
```

## Security Notes

1. **Change JWT_SECRET**: Before deploying to production, change the `JWT_SECRET` to a strong random string
2. **Environment Variables**: Never commit `.env` files with real secrets to version control
3. **HTTPS**: Always use HTTPS in production
4. **Password Hashing**: Passwords are automatically hashed using bcrypt with 10 salt rounds
