package com.resume.backend;

import com.resume.backend.config.AiConfig.AiClient;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.verifyNoInteractions;

@SpringBootTest(
    webEnvironment = SpringBootTest.WebEnvironment.MOCK,
    properties = {
        "spring.cloud.function.scan.enabled=false",
        "spring.main.allow-bean-definition-overriding=true"
    }
)
@ActiveProfiles("test")
class ResumeAiBackendApplicationTests {

    @MockBean
    private AiClient aiClient;  // Updated to use our custom AiClient interface

    @Test
    void contextLoadsAndDependenciesAreAvailable() {
        assertNotNull(aiClient, "AiClient should be available in the context");
    }
    
    @Test
    void aiClientIsNotCalledDuringContextLoad() {
        // Verify the mock wasn't called during context initialization
        verifyNoInteractions(aiClient);
    }
    
    // Add more test methods for your specific application components
}