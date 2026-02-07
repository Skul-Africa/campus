# Database Connection Guide

## Option 1: Local PostgreSQL (Recommended for Development)

### Setup Local Database with Docker Compose

1. Make sure Docker is running
2. Start PostgreSQL container:
```bash
docker-compose up -d
```

3. Update `.env` for local development:
```bash
cp .env.local .env
```

4. Start the app:
```bash
npm start:dev
```

### Verify Local Connection
```bash
psql -h localhost -p 5432 -U postgres -d vibetik
```

---

## Option 2: Supabase Cloud Database

If you want to use Supabase instead of local PostgreSQL:

1. Keep the `.env` file with your Supabase credentials:
```
DB_HOST=db.duacetsntxflnzwgywme.supabase.co
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=K2Ohsvnkj6MALXBi
DB_NAME=postgres
DB_SYNCHRONIZE=true
```

2. **Important**: You may need to:
   - Enable IPv6 in your container network
   - Or use a VPN/proxy to connect to Supabase
   - Or whitelist your container's IP in Supabase firewall settings

3. Start the app:
```bash
npm start:dev
```

---

## Troubleshooting Connection Errors

### ENETUNREACH Error
This means the container can't reach the database server. Common causes:
- Network connectivity issues
- Firewall blocking the connection
- IPv6/IPv4 mismatch

**Solution**: Use local PostgreSQL with Docker Compose (Option 1)

### Connection Refused
Database server is not running.

**Solution**: 
```bash
docker-compose up -d  # Start PostgreSQL
```

### Authentication Failed
Wrong credentials in `.env`

**Solution**: Check your database username, password, and DB_NAME in `.env`

---

## Switching Between Local and Cloud

To switch from local to Supabase:
```bash
# Save current .env
mv .env .env.local

# Restore Supabase .env
cp .env.supabase .env
```

To switch from Supabase to local:
```bash
cp .env.local .env
docker-compose up -d
```
