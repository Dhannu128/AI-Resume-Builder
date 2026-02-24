package com.resume.backend.controller;

import com.resume.backend.dto.*;
import com.resume.backend.service.ResumeService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/resume")
public class ResumeController {

    private static final Logger logger = LoggerFactory.getLogger(ResumeController.class);
    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping
    public ResponseEntity<?> generateResume(@Valid @RequestBody ResumeRequest request) {
        try {
            ResumeDTO resumeData = resumeService.generateResumeResponse(request.getUserDescription());
            
            return ResponseEntity.ok(Map.of(
                "status", "success",
                "data", Map.of(
                    "resume", resumeData  // Frontend expects response.data.data.resume
                ),
                "message", "Resume generated successfully"
            ));

        } catch (Exception e) {
            logger.error("Resume generation failed: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                        "status", "error",
                        "message", e.getMessage(),
                        "data", null
                    ));
        }
    }

    @PostMapping("/prepare-interview")
    public ResponseEntity<?> prepareInterview(@Valid @RequestBody InterviewRequest request) {
        try {
            InterviewPreparationDTO prep = resumeService.generateInterviewQuestions(
                request.getResumeContent(),
                request.getJobDescription()
            );
            
            return ResponseEntity.ok(Map.of(
                "status", "success",
                "data", Map.of(
                    "interview", prep
                ),
                "message", "Interview preparation completed"
            ));

        } catch (Exception e) {
            logger.error("Interview preparation failed: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                        "status", "error",
                        "message", "Interview preparation failed: " + e.getMessage(),
                        "data", null
                    ));
        }
    }


}