# Local Development Database Setup

## Option 1: Docker PostgreSQL (Recommended)

1. **Create docker-compose.yml:**
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: aws_quiz_dev
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password123
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

2. **Start the database:**
```bash
docker-compose up -d
```

3. **Update .env.local:**
```env
DATABASE_URL="postgresql://postgres:password123@localhost:5432/aws_quiz_dev"
DIRECT_URL="postgresql://postgres:password123@localhost:5432/aws_quiz_dev"
```

4. **Initialize the database:**
```bash
npx prisma db push
npx prisma db seed  # if you have seed data
```

## Option 2: Use Supabase with Fresh Credentials

1. **Get new credentials from Supabase Dashboard:**
   - Go to Project Settings → Database
   - Copy the Connection String
   
2. **Update your .env files:**
```env
DATABASE_URL="YOUR_NEW_SUPABASE_CONNECTION_STRING"
DIRECT_URL="YOUR_NEW_SUPABASE_DIRECT_CONNECTION_STRING"
```

3. **Test the connection:**
```bash
./test-db-connection.sh
```

## Immediate Action Required:

**You need to update your DATABASE_URL with valid credentials before the application will work.**

The current database connection is failing, which means:
- All server actions that use Prisma will fail
- Exam history won't load
- Quiz results won't be saved
- User data won't be accessible

Choose one of the options above and update your environment variables accordingly.