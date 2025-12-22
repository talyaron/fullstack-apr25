#!/bin/bash

# Space Task Manager - Development Script
# This script starts MongoDB and runs both server and client

echo "🚀 Starting Space Task Manager..."

# Check if MongoDB is running
if ! brew services list | grep -q "mongodb-community.*started"; then
    echo "📦 Starting MongoDB..."
    brew services start mongodb-community
    sleep 2
fi

echo "✅ MongoDB is running"

# Navigate to project root
cd "$(dirname "$0")/.."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📥 Installing dependencies..."
    npm install
fi

# Build shared package if needed
if [ ! -d "shared/dist" ]; then
    echo "🔨 Building shared package..."
    npm run build --workspace=shared
fi

echo "🌌 Starting development servers..."
echo "   Server: http://localhost:3001"
echo "   Client: http://localhost:5173"
echo ""

# Run both server and client
npm run dev
