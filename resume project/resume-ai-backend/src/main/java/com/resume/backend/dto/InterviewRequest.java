package com.resume.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class InterviewRequest {
    @NotBlank(message = "Resume content cannot be empty")
    @Size(min = 10, max = 10000, message = "Resume content must be between 10 and 10000 characters")
    private String resumeContent;

    @Size(max = 5000, message = "Job description cannot exceed 5000 characters")
    private String jobDescription;

    public String getResumeContent() {
        return resumeContent;
    }

    public void setResumeContent(String resumeContent) {
        this.resumeContent = resumeContent;
    }

    public String getJobDescription() {
        return jobDescription;
    }

    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }
}

