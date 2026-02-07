# Swagger & CORS Setup

## Swagger Documentation

Swagger API documentation is now integrated into your NestJS application. Once the app is running, you can access it at:

```
http://localhost:3000/api/docs
```

### Features

- **Interactive API Testing**: Test all endpoints directly from the Swagger UI
- **Authentication Support**: Built-in JWT bearer token authentication
- **Request/Response Examples**: Pre-populated example values for all endpoints
- **Schema Validation**: Clear documentation of request and response models

### Accessing Swagger

1. Start the application:
```bash
npm start:dev
```

2. Open your browser and navigate to:
```
http://localhost:3000/api/docs
```

3. You'll see all available endpoints:
   - `POST /auth/signup` - Create a new user
   - `POST /auth/login` - Login and get JWT token
   - `GET /auth/profile` - Get authenticated user profile

### Using JWT in Swagger

1. First, call the `/auth/login` endpoint to get a token
2. Copy the `accessToken` from the response
3. Click the "Authorize" button in the top right
4. Paste your token in the Authorization header field
5. Now you can test protected endpoints like `/auth/profile`

## CORS (Cross-Origin Resource Sharing)

CORS is enabled globally on your application to allow requests from external domains.

### Current Configuration

```typescript
app.enableCors({
  origin: '*',                    // Allow all origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization',
});
```

### Changing CORS Settings

To restrict CORS to specific domains, edit `src/main.ts`:

```typescript
// Allow only specific domains
app.enableCors({
  origin: ['http://localhost:3000', 'https://myapp.com'],
  credentials: true,
});
```

### CORS Options Explained

| Option | Description |
|--------|-------------|
| `origin` | Which domains can access the API (`*` = all domains) |
| `methods` | Allowed HTTP methods |
| `credentials` | Whether to allow credentials (cookies, auth headers) |
| `allowedHeaders` | Headers that clients can send |

## Testing with cURL

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

### Get Profile (with token)
```bash
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## Environment Variables

No additional environment variables are required for Swagger and CORS. They are configured globally in `src/main.ts`.

## Production Considerations

### Swagger in Production

To disable Swagger in production, add to `src/main.ts`:

```typescript
if (process.env.NODE_ENV !== 'production') {
  SwaggerModule.setup('api/docs', app, document);
}
```

### CORS in Production

For production, restrict CORS to your frontend domain:

```typescript
app.enableCors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
});
```

Then set in `.env`:
```
CORS_ORIGIN=https://yourdomain.com
NODE_ENV=production
```
