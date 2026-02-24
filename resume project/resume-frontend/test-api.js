// Simple test script to verify API connection
import { generateResume } from './src/api/ResumeService.js';

const testDescription = "I am a software engineer with 3 years of experience in Java and Spring Boot. I have worked on REST APIs and microservices.";

console.log('Testing API connection...');
console.log('API Base URL:', process.env.VITE_API_BASE_URL || 'https://resume-ai-backend-production.up.railway.app');

generateResume(testDescription)
  .then(result => {
    console.log('API Test Result:', result);
    if (result.success) {
      console.log('✅ API connection successful!');
      console.log('Resume data received:', Object.keys(result.data));
    } else {
      console.log('❌ API returned error:', result.error);
    }
  })
  .catch(error => {
    console.log('❌ API test failed:', error.message);
  });
