package com.resume.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.resume.backend.dto.InterviewPreparationDTO;
import com.resume.backend.dto.InterviewQuestionDTO;
import com.resume.backend.dto.InterviewRequest;
import com.resume.backend.dto.ResumeDTO;
import com.resume.backend.dto.ResumeRequest;
import com.resume.backend.service.ResumeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ResumeController.class)
class ResumeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ResumeService resumeService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void generateResume_ValidInput_ReturnsSuccess() throws Exception {
        // Arrange
        ResumeRequest request = new ResumeRequest("I am a software engineer with 3 years of experience");
        ResumeDTO mockResume = createMockResumeDTO();
        when(resumeService.generateResumeResponse(anyString())).thenReturn(mockResume);

        // Act & Assert
        mockMvc.perform(post("/api/v1/resume")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("success"))
                .andExpect(jsonPath("$.data.resume").exists())
                .andExpect(jsonPath("$.message").value("Resume generated successfully"));
    }

    @Test
    void generateResume_EmptyDescription_ReturnsBadRequest() throws Exception {
        // Arrange
        ResumeRequest request = new ResumeRequest("");

        // Act & Assert
        mockMvc.perform(post("/api/v1/resume")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value("error"));
    }

    @Test
    void generateResume_TooShortDescription_ReturnsBadRequest() throws Exception {
        // Arrange
        ResumeRequest request = new ResumeRequest("Short");

        // Act & Assert
        mockMvc.perform(post("/api/v1/resume")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value("error"));
    }

    @Test
    void prepareInterview_ValidInput_ReturnsSuccess() throws Exception {
        // Arrange
        InterviewRequest request = new InterviewRequest();
        request.setResumeContent("John Doe - Software Engineer with Java experience");
        request.setJobDescription("Looking for Java developer");
        
        InterviewPreparationDTO mockInterview = createMockInterviewDTO();
        when(resumeService.generateInterviewQuestions(anyString(), anyString())).thenReturn(mockInterview);

        // Act & Assert
        mockMvc.perform(post("/api/v1/resume/prepare-interview")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("success"))
                .andExpect(jsonPath("$.data.interview").exists())
                .andExpect(jsonPath("$.message").value("Interview preparation completed"));
    }

    @Test
    void prepareInterview_EmptyResumeContent_ReturnsBadRequest() throws Exception {
        // Arrange
        InterviewRequest request = new InterviewRequest();
        request.setResumeContent("");
        request.setJobDescription("Job description");

        // Act & Assert
        mockMvc.perform(post("/api/v1/resume/prepare-interview")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value("error"));
    }

    private ResumeDTO createMockResumeDTO() {
        ResumeDTO resume = new ResumeDTO();
        ResumeDTO.PersonalInformation personalInfo = new ResumeDTO.PersonalInformation();
        personalInfo.setFullName("John Doe");
        personalInfo.setEmail("john@example.com");
        resume.setPersonalInformation(personalInfo);
        resume.setSummary("Software Engineer");
        return resume;
    }

    private InterviewPreparationDTO createMockInterviewDTO() {
        InterviewPreparationDTO interview = new InterviewPreparationDTO();
        interview.setSummary("Focus on Java skills");
        
        InterviewQuestionDTO question = new InterviewQuestionDTO();
        question.setQuestion("What is polymorphism?");
        question.setCategory("Java");
        question.setDifficulty("Medium");
        
        interview.setQuestions(Arrays.asList(question));
        return interview;
    }
}
