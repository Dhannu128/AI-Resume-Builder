#!/bin/bash

echo "Starting AI Resume Generator Frontend..."
echo ""

echo "Checking if backend is running..."
if curl -s http://localhost:8080/actuator/health > /dev/null; then
    echo "✅ Backend is running at http://localhost:8080"
else
    echo "⚠️  WARNING: Backend not detected at http://localhost:8080"
    echo "Make sure your Spring Boot backend is running!"
fi

echo ""
echo "Starting frontend development server..."
npm run dev
