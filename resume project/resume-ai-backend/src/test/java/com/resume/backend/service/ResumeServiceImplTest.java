package com.resume.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.resume.backend.config.AiConfig.AiClient;
import com.resume.backend.config.AiConfig.AiServiceException;
import com.resume.backend.dto.InterviewPreparationDTO;
import com.resume.backend.dto.ResumeDTO;
import com.resume.backend.util.InputSanitizer;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ResumeServiceImplTest {

    @Mock
    private AiClient aiClient;

    @Mock
    private InputSanitizer inputSanitizer;

    private ResumeServiceImpl resumeService;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
        resumeService = new ResumeServiceImpl(
            aiClient,
            new ClassPathResource("resume_prompt.txt"),
            new ClassPathResource("interview_prompt.txt"),
            2000,
            objectMapper,
            inputSanitizer
        );
    }

    @Test
    void generateResumeResponse_ValidInput_ReturnsResumeDTO() throws IOException, AiServiceException {
        // Arrange
        String userDescription = "I am a software engineer with Java experience";
        String sanitizedInput = "I am a software engineer with Java experience";
        String mockAiResponse = createMockResumeJson();

        when(inputSanitizer.sanitizeUserInput(userDescription)).thenReturn(sanitizedInput);
        when(inputSanitizer.isValidInput(sanitizedInput)).thenReturn(true);
        when(aiClient.generateText(anyString())).thenReturn(mockAiResponse);

        // Act
        ResumeDTO result = resumeService.generateResumeResponse(userDescription);

        // Assert
        assertNotNull(result);
        assertNotNull(result.getPersonalInformation());
        assertEquals("John Doe", result.getPersonalInformation().getFullName());
        assertEquals("john@example.com", result.getPersonalInformation().getEmail());
    }

    @Test
    void generateResumeResponse_EmptyInput_ThrowsException() {
        // Arrange
        String emptyDescription = "";

        // Act & Assert
        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> resumeService.generateResumeResponse(emptyDescription)
        );
        assertEquals("User description cannot be empty", exception.getMessage());
    }

    @Test
    void generateResumeResponse_InvalidInput_ThrowsException() {
        // Arrange
        String maliciousInput = "<script>alert('xss')</script>";
        String sanitizedInput = "alert('xss')";

        when(inputSanitizer.sanitizeUserInput(maliciousInput)).thenReturn(sanitizedInput);
        when(inputSanitizer.isValidInput(sanitizedInput)).thenReturn(false);

        // Act & Assert
        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> resumeService.generateResumeResponse(maliciousInput)
        );
        assertEquals("Invalid input detected. Please provide a clean description.", exception.getMessage());
    }

    @Test
    void generateInterviewQuestions_ValidInput_ReturnsInterviewDTO() throws IOException, AiServiceException {
        // Arrange
        String resumeContent = "John Doe - Software Engineer";
        String jobDescription = "Java Developer position";
        String sanitizedResume = "John Doe - Software Engineer";
        String sanitizedJob = "Java Developer position";
        String mockAiResponse = createMockInterviewJson();

        when(inputSanitizer.sanitizeUserInput(resumeContent)).thenReturn(sanitizedResume);
        when(inputSanitizer.sanitizeUserInput(jobDescription)).thenReturn(sanitizedJob);
        when(inputSanitizer.isValidInput(sanitizedResume)).thenReturn(true);
        when(inputSanitizer.isValidInput(sanitizedJob)).thenReturn(true);
        when(aiClient.generateText(anyString())).thenReturn(mockAiResponse);

        // Act
        InterviewPreparationDTO result = resumeService.generateInterviewQuestions(resumeContent, jobDescription);

        // Assert
        assertNotNull(result);
        assertEquals("Focus on Java skills", result.getSummary());
        assertNotNull(result.getQuestions());
        assertFalse(result.getQuestions().isEmpty());
    }

    @Test
    void generateInterviewQuestions_EmptyResumeContent_ThrowsException() {
        // Arrange
        String emptyResume = "";
        String jobDescription = "Java Developer";

        // Act & Assert
        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> resumeService.generateInterviewQuestions(emptyResume, jobDescription)
        );
        assertEquals("Resume content cannot be empty", exception.getMessage());
    }

    private String createMockResumeJson() {
        return """
            {
              "personalInformation": {
                "fullName": "John Doe",
                "email": "john@example.com",
                "phoneNumber": "+1 555-1234",
                "location": "Remote"
              },
              "summary": "Software Engineer with Java experience",
              "skills": [{"title": "Java", "level": "Proficient"}],
              "experience": [],
              "education": [],
              "certifications": [],
              "projects": [],
              "achievements": [],
              "languages": [{"name": "English"}],
              "interests": [{"name": "Coding"}]
            }
            """;
    }

    private String createMockInterviewJson() {
        return """
            {
              "summary": "Focus on Java skills",
              "questions": [
                {
                  "question": "What is polymorphism?",
                  "category": "Java",
                  "difficulty": "Medium"
                }
              ]
            }
            """;
    }
}
