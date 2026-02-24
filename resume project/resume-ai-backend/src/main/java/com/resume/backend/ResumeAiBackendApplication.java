package com.resume.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.retry.annotation.EnableRetry;

@EnableRetry
@SpringBootApplication
public class ResumeAiBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(ResumeAiBackendApplication.class, args);
        System.out.println("""
            ╔════════════════════════════════════════════════════╗
            ║   APPLICATION STARTED - READY FOR REQUESTS        ║
            ╚════════════════════════════════════════════════════╝""");
    }
}