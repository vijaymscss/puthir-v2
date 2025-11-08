#!/bin/bash

# Database Connection Test Script
# Run this after updating your DATABASE_URL

echo "Testing database connection..."

# Test 1: Prisma connection
echo "1. Testing Prisma connection..."
npx prisma db pull --print > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Prisma connection successful"
else
    echo "❌ Prisma connection failed"
    echo "   Please check your DATABASE_URL in .env files"
    exit 1
fi

# Test 2: Database schema sync
echo "2. Checking schema sync..."
npx prisma generate > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Schema generation successful"
else
    echo "❌ Schema generation failed"
    exit 1
fi

# Test 3: Push schema if needed
echo "3. Ensuring database schema is up to date..."
npx prisma db push > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Database schema is synchronized"
else
    echo "⚠️  Database schema push failed - may need manual intervention"
fi

echo "🎉 Database connection test completed!"
echo ""
echo "Next steps:"
echo "1. Start your development server: npm run dev"
echo "2. Test the exam history page"
echo "3. Check if the error is resolved"