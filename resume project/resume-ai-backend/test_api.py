import requests
import json

# Test the resume generation endpoint
def test_resume_generation():
    url = "http://localhost:8081/api/v1/resume"
    
    test_data = {
        "userDescription": "I am a software engineer with 3 years of experience in Java and Spring Boot. I have worked on microservices and REST APIs. I have a Bachelor's degree in Computer Science."
    }
    
    try:
        response = requests.post(url, json=test_data, timeout=30)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        return response.status_code == 200
    except requests.exceptions.ConnectionError:
        print("Connection failed - server might not be running")
        return False
    except Exception as e:
        print(f"Error: {e}")
        return False

# Test the interview preparation endpoint
def test_interview_preparation():
    url = "http://localhost:8081/api/v1/resume/prepare-interview"
    
    test_data = {
        "resumeContent": "John Doe - Software Engineer with Java and Spring Boot experience",
        "jobDescription": "Looking for a Java developer with Spring Boot experience"
    }
    
    try:
        response = requests.post(url, json=test_data, timeout=30)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        return response.status_code == 200
    except requests.exceptions.ConnectionError:
        print("Connection failed - server might not be running")
        return False
    except Exception as e:
        print(f"Error: {e}")
        return False

if __name__ == "__main__":
    print("Testing Resume Generation API...")
    test_resume_generation()
    
    print("\nTesting Interview Preparation API...")
    test_interview_preparation()
