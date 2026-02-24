package com.resume.backend.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleIllegalArgumentException(IllegalArgumentException e) {
        logger.warn("Invalid argument: {}", e.getMessage());
        return ResponseEntity.badRequest().body(Map.of(
            "status", "error",
            "message", e.getMessage(),
            "data", null
        ));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, Object>> handleHttpMessageNotReadableException(HttpMessageNotReadableException e) {
        logger.warn("Invalid JSON format: {}", e.getMessage());
        return ResponseEntity.badRequest().body(Map.of(
            "status", "error",
            "message", "Invalid JSON format in request body",
            "data", null
        ));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        logger.warn("Validation failed: {}", e.getMessage());
        return ResponseEntity.badRequest().body(Map.of(
            "status", "error",
            "message", "Validation failed: " + e.getBindingResult().getFieldError().getDefaultMessage(),
            "data", null
        ));
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<Map<String, Object>> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException e) {
        logger.warn("Type mismatch: {}", e.getMessage());
        return ResponseEntity.badRequest().body(Map.of(
            "status", "error",
            "message", "Invalid parameter type",
            "data", null
        ));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGenericException(Exception e) {
        logger.error("Unexpected error occurred: {}", e.getMessage(), e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
            "status", "error",
            "message", "An unexpected error occurred. Please try again later.",
            "data", null
        ));
    }
}
