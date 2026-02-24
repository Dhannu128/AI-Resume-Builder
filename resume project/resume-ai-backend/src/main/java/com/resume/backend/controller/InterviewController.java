package com.resume.backend.controller;

import com.resume.backend.dto.InterviewPreparationDTO;
import com.resume.backend.dto.InterviewRequest;
import com.resume.backend.service.ResumeService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/interview")
@CrossOrigin(origins = "*")
public class InterviewController {

    private static final Logger logger = LoggerFactory.getLogger(InterviewController.class);
    private final ResumeService resumeService;

    public InterviewController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping("/prep")
    public ResponseEntity<?> prepareInterview(@Valid @RequestBody InterviewRequest request) {
        try {
            logger.info("Received interview prep request");
            logger.info("Resume content length: {}", 
                request.getResumeContent() != null ? request.getResumeContent().length() : 0);
            logger.info("Job description: {}", request.getJobDescription());

            // Validate inputs
            if (request.getResumeContent() == null || request.getResumeContent().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "status", "error",
                    "message", "Resume content is required",
                    "data", null
                ));
            }

            if (request.getJobDescription() == null || request.getJobDescription().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "status", "error",
                    "message", "Job description is required",
                    "data", null
                ));
            }

            InterviewPreparationDTO prep = resumeService.generateInterviewQuestions(
                request.getResumeContent(),
                request.getJobDescription()
            );

            logger.info("Interview questions generated successfully. Question count: {}", 
                prep.getQuestions() != null ? prep.getQuestions().size() : 0);

            return ResponseEntity.ok(prep);

        } catch (Exception e) {
            logger.error("Interview preparation failed", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                        "status", "error",
                        "message", "Failed to generate interview questions: " + e.getMessage(),
                        "data", null
                    ));
        }
    }
}
