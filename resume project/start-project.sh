#!/bin/bash

# Resume AI Maker - Project Startup Script
echo "🚀 Starting Resume AI Maker Project..."

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed. Please install Java 17:"
    echo "sudo apt update && sudo apt install openjdk-17-jdk"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js:"
    echo "sudo apt install nodejs npm"
    exit 1
fi

echo "✅ Java version: $(java -version 2>&1 | head -n 1)"
echo "✅ Node.js version: $(node --version)"
echo "✅ NPM version: $(npm --version)"

# Check for Gemini API key
if [ ! -f "resume-ai-backend/.env" ]; then
    echo "⚠️  Backend .env file not found. Creating template..."
    echo "Please edit resume-ai-backend/.env and add your Gemini API key"
fi

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd resume-frontend
npm install
cd ..

# Install backend dependencies (if needed)
echo "📦 Installing backend dependencies..."
cd resume-ai-backend
if [ -f "package.json" ]; then
    npm install
fi
cd ..

echo "🎉 Setup complete! Now you can:"
echo "1. Edit resume-ai-backend/.env and add your Together.AI API key"
echo "2. Run: ./start-backend.sh (in one terminal)"
echo "3. Run: ./start-frontend.sh (in another terminal)"
