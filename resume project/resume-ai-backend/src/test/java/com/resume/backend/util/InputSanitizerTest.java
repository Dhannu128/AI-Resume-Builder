package com.resume.backend.util;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class InputSanitizerTest {

    private InputSanitizer inputSanitizer;

    @BeforeEach
    void setUp() {
        inputSanitizer = new InputSanitizer();
    }

    @Test
    void sanitizeUserInput_ValidInput_ReturnsCleanInput() {
        // Arrange
        String validInput = "I am a software engineer with 3 years of experience in Java and Spring Boot.";

        // Act
        String result = inputSanitizer.sanitizeUserInput(validInput);

        // Assert
        assertEquals(validInput, result);
    }

    @Test
    void sanitizeUserInput_InputWithScriptTags_RemovesScriptTags() {
        // Arrange
        String maliciousInput = "I am a developer <script>alert('xss')</script> with experience";

        // Act
        String result = inputSanitizer.sanitizeUserInput(maliciousInput);

        // Assert
        assertFalse(result.contains("<script>"));
        assertFalse(result.contains("</script>"));
        assertTrue(result.contains("I am a developer"));
        assertTrue(result.contains("with experience"));
    }

    @Test
    void sanitizeUserInput_InputWithControlCharacters_RemovesControlCharacters() {
        // Arrange
        String inputWithControlChars = "Normal text\u0000\u0001\u0002 more text";

        // Act
        String result = inputSanitizer.sanitizeUserInput(inputWithControlChars);

        // Assert
        assertEquals("Normal text more text", result);
    }

    @Test
    void sanitizeUserInput_InputWithExcessiveWhitespace_NormalizesWhitespace() {
        // Arrange
        String inputWithWhitespace = "  Too    much     whitespace   ";

        // Act
        String result = inputSanitizer.sanitizeUserInput(inputWithWhitespace);

        // Assert
        assertEquals("Too much whitespace", result);
    }

    @Test
    void sanitizeUserInput_NullInput_ReturnsNull() {
        // Act
        String result = inputSanitizer.sanitizeUserInput(null);

        // Assert
        assertNull(result);
    }

    @Test
    void isValidInput_ValidInput_ReturnsTrue() {
        // Arrange
        String validInput = "I am a software engineer with experience in Java and Spring Boot.";

        // Act
        boolean result = inputSanitizer.isValidInput(validInput);

        // Assert
        assertTrue(result);
    }

    @Test
    void isValidInput_EmptyInput_ReturnsFalse() {
        // Arrange
        String emptyInput = "";

        // Act
        boolean result = inputSanitizer.isValidInput(emptyInput);

        // Assert
        assertFalse(result);
    }

    @Test
    void isValidInput_NullInput_ReturnsFalse() {
        // Act
        boolean result = inputSanitizer.isValidInput(null);

        // Assert
        assertFalse(result);
    }

    @Test
    void isValidInput_InputWithSQLInjection_ReturnsFalse() {
        // Arrange
        String sqlInjectionInput = "'; DROP TABLE users; --";

        // Act
        boolean result = inputSanitizer.isValidInput(sqlInjectionInput);

        // Assert
        assertFalse(result);
    }

    @Test
    void isValidInput_InputWithScriptTag_ReturnsFalse() {
        // Arrange
        String scriptInput = "Normal text <script>alert('xss')</script>";

        // Act
        boolean result = inputSanitizer.isValidInput(scriptInput);

        // Assert
        assertFalse(result);
    }

    @Test
    void isValidInput_InputWithPathTraversal_ReturnsFalse() {
        // Arrange
        String pathTraversalInput = "../../etc/passwd";

        // Act
        boolean result = inputSanitizer.isValidInput(pathTraversalInput);

        // Assert
        assertFalse(result);
    }

    @Test
    void isValidInput_InputWithFileProtocol_ReturnsFalse() {
        // Arrange
        String fileProtocolInput = "file:///etc/passwd";

        // Act
        boolean result = inputSanitizer.isValidInput(fileProtocolInput);

        // Assert
        assertFalse(result);
    }
}
