#!/bin/bash

# Start Resume AI Frontend
echo "🚀 Starting Resume AI Frontend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js:"
    echo "sudo apt install nodejs npm"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ NPM version: $(npm --version)"

# Navigate to frontend directory
cd resume-frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if .env exists, if not create it for local development
if [ ! -f ".env" ]; then
    echo "📝 Creating local development .env file..."
    echo "VITE_API_BASE_URL=http://localhost:8080" > .env
fi

echo "🌐 Starting frontend development server..."
echo "Frontend will be available at: http://localhost:5173"
echo "Backend should be running at: http://localhost:8080"

# Start the development server
npm run dev
