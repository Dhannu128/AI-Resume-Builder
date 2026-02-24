package com.resume.backend.util;

import org.springframework.stereotype.Component;

@Component
public class InputSanitizer {

    /**
     * Sanitizes user input by removing potentially harmful characters
     * while preserving legitimate content for resume generation
     */
    public String sanitizeUserInput(String input) {
        if (input == null) {
            return null;
        }
        
        // Remove null bytes and control characters except newlines and tabs
        String sanitized = input.replaceAll("[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]", "");
        
        // Remove potential script tags and other dangerous HTML
        sanitized = sanitized.replaceAll("(?i)<script[^>]*>.*?</script>", "");
        sanitized = sanitized.replaceAll("(?i)<iframe[^>]*>.*?</iframe>", "");
        sanitized = sanitized.replaceAll("(?i)javascript:", "");
        sanitized = sanitized.replaceAll("(?i)vbscript:", "");
        sanitized = sanitized.replaceAll("(?i)onload=", "");
        sanitized = sanitized.replaceAll("(?i)onerror=", "");
        
        // Trim excessive whitespace
        sanitized = sanitized.trim();
        sanitized = sanitized.replaceAll("\\s+", " ");
        
        return sanitized;
    }

    /**
     * Validates that the input doesn't contain suspicious patterns
     */
    public boolean isValidInput(String input) {
        if (input == null || input.trim().isEmpty()) {
            return false;
        }
        
        // Check for suspicious patterns
        String lowerInput = input.toLowerCase();
        String[] suspiciousPatterns = {
            "drop table", "delete from", "insert into", "update set",
            "union select", "exec(", "eval(", "system(",
            "../", "..\\", "file://", "ftp://",
            "<?php", "<%", "<script", "<iframe"
        };
        
        for (String pattern : suspiciousPatterns) {
            if (lowerInput.contains(pattern)) {
                return false;
            }
        }
        
        return true;
    }
}
