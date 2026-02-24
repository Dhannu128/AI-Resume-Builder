package com.resume.backend.service;

import com.resume.backend.dto.InterviewPreparationDTO;
import com.resume.backend.dto.ResumeDTO;
import java.io.IOException;

public interface ResumeService {
    ResumeDTO generateResumeResponse(String userResumeDescription) throws IOException;
    InterviewPreparationDTO generateInterviewQuestions(String resumeContent, String jobDescription) throws IOException;
}