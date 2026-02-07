# MongoDB Setup

Your project has been migrated from PostgreSQL (TypeORM) to MongoDB (Mongoose).

## MongoDB Connection

The app is configured to connect to MongoDB using the connection string in your `.env` file:

```
MONGODB_URI=mongodb+srv://gregemax700_db_user:ocheameh@cluster0.ay3ymck.mongodb.net/?appName=Cluster0
```

## Running the Application

1. Start the app:
```bash
npm start:dev
```

The app will automatically connect to MongoDB and create the necessary collections.

## Database Collections

The following collection will be created automatically:
- **users**: Stores user accounts with name, email, and hashed password

## File Structure

- `src/entities/user.entity.ts` - User Mongoose schema
- `src/users/users.service.ts` - Business logic for user management
- `src/users/users.module.ts` - Users module with Mongoose imports
- `src/database.config.ts` - MongoDB URI configuration

## API Endpoints

### Sign Up
```bash
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Profile (Protected)
```bash
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Environment Configuration

- `.env` - Current configuration with MongoDB Atlas connection
- `.env.example` - Template for new environments
- `.env.local` - Local MongoDB development setup (optional)

## Using Local MongoDB

If you want to use a local MongoDB instance instead:

1. Install MongoDB locally or use Docker:
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

2. Update `.env`:
```
MONGODB_URI=mongodb://localhost:27017/vibetik
```

3. Restart the app:
```bash
npm start:dev
```
