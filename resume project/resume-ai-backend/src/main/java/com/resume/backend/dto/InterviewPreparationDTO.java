package com.resume.backend.dto;

import java.util.List;

public class InterviewPreparationDTO {
    private String summary;
    private List<InterviewQuestionDTO> questions;

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public List<InterviewQuestionDTO> getQuestions() {
        return questions;
    }

    public void setQuestions(List<InterviewQuestionDTO> questions) {
        this.questions = questions;
    }
}

