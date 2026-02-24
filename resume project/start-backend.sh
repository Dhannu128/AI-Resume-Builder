#!/bin/bash

# Start Resume AI Backend
echo "🚀 Starting Resume AI Backend..."

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed. Please install Java 17:"
    echo "sudo apt update && sudo apt install openjdk-17-jdk"
    exit 1
fi

# Check for .env file
if [ ! -f "resume-ai-backend/.env" ]; then
    echo "⚠️  .env file not found in resume-ai-backend/"
    echo "Please create .env file with your Together.AI API key"
    echo "Example:"
    echo "TOGETHER_AI_API_KEY=your_api_key_here"
    exit 1
fi

# Load environment variables
export $(cat resume-ai-backend/.env | grep -v '^#' | xargs)

# Check if API key is set
if [ -z "$GEMINI_API_KEY" ] || [ "$GEMINI_API_KEY" = "your_gemini_api_key_here" ]; then
    echo "❌ Please set your Gemini API key in resume-ai-backend/.env"
    echo "Get your API key from: https://makersuite.google.com/app/apikey"
    exit 1
fi

echo "✅ Environment variables loaded"
echo "🌐 Starting backend on port ${PORT:-8080}..."

# Navigate to backend directory
cd resume-ai-backend

# Start the Spring Boot application
if [ -f "mvnw" ]; then
    echo "📦 Using Maven wrapper..."
    ./mvnw spring-boot:run
elif command -v mvn &> /dev/null; then
    echo "📦 Using system Maven..."
    mvn spring-boot:run
else
    echo "❌ Maven not found. Please install Maven or use the Maven wrapper"
    exit 1
fi
