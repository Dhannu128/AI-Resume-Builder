package com.resume.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ResumeRequest {

    @NotBlank(message = "User description cannot be empty")
    @Size(min = 10, max = 5000, message = "User description must be between 10 and 5000 characters")
    private String userDescription;

    public ResumeRequest() {
    }

    public ResumeRequest(String userDescription) {
        this.userDescription = userDescription;
    }

    public String getUserDescription() {
        return userDescription;
    }

    public void setUserDescription(String userDescription) {
        this.userDescription = userDescription;
    }

    @Override
    public String toString() {
        return "ResumeRequest{" +
                "userDescription='" + userDescription + '\'' +
                '}';
    }
}



