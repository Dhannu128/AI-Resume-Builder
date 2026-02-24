package com.resume.backend.config;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClient;

import java.time.Duration;
import java.util.List;

@Configuration
public class AiConfig {

    @Value("${app.ai.gemini.api-key:}")
    private String apiKey;

    @Value("${app.ai.gemini.model:gemini-1.5-flash}")
    private String model;

    @Value("${app.ai.gemini.max-tokens:2000}")
    private int maxTokens;

    @Value("${app.ai.gemini.temperature:0.7}")
    private float temperature;

    @Bean
    public AiClient geminiAiClient() {
        if (apiKey == null || apiKey.isBlank()) {
            return new MockAiClient();
        }
        return new GeminiAiClient(apiKey, model, maxTokens, temperature);
    }

    public interface AiClient {
        String generateText(String prompt) throws AiServiceException;
    }

    public static class GeminiAiClient implements AiClient {
        private static final Logger logger = LoggerFactory.getLogger(GeminiAiClient.class);
        private static final String API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/";

        private final String apiKey;
        private final String model;
        private final int maxTokens;
        private final float temperature;
        private final WebClient webClient;

        public GeminiAiClient(String apiKey, String model, int maxTokens, float temperature) {
            this.apiKey = apiKey;
            this.model = model;
            this.maxTokens = Math.min(maxTokens, 2000);
            this.temperature = temperature;

            HttpClient httpClient = HttpClient.create().responseTimeout(Duration.ofSeconds(120));

            this.webClient = WebClient.builder()
                .defaultHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .build();
        }

        @Override
        public String generateText(String prompt) throws AiServiceException {
            // Allow longer prompts (up to 5000 characters) to include full context
            if (prompt.length() > 5000) {
                logger.warn("Prompt length: {} characters, will be truncated to 5000", prompt.length());
                prompt = prompt.substring(0, 5000) + "... [truncated]";
            } else {
                logger.info("Prompt length: {} characters", prompt.length());
            }

            if (apiKey == null || apiKey.isBlank()) {
                logger.error("Gemini API key is missing or blank");
                throw new AiServiceException("Missing Gemini API key. Set app.ai.gemini.api-key");
            }

            GeminiRequest request = new GeminiRequest(
                List.of(new GeminiRequest.Content(
                    List.of(new GeminiRequest.Part(prompt))
                )),
                new GeminiRequest.GenerationConfig(maxTokens, temperature)
            );

            try {
                String url = API_BASE_URL + model + ":generateContent?key=" + apiKey;
                logger.info("Calling Gemini API: {}", API_BASE_URL + model + ":generateContent");
                
                GeminiResponse response = this.webClient
                    .post()
                    .uri(url)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(request)
                    .retrieve()
                    .onStatus(status -> status.is4xxClientError() || status.is5xxServerError(),
                        clientResponse -> clientResponse.bodyToMono(String.class)
                            .map(body -> {
                                logger.error("Gemini API error response: {}", body);
                                return new AiServiceException("Gemini API error: " + body);
                            }))
                    .bodyToMono(GeminiResponse.class)
                    .timeout(Duration.ofSeconds(120))
                    .block();

                if (response == null || response.candidates == null || response.candidates.isEmpty()) {
                    logger.error("Empty or null response from Gemini API");
                    throw new AiServiceException("Empty response from Gemini API");
                }

                String content = response.candidates.get(0).content.parts.get(0).text;
                logger.info("Received Gemini AI response. Length: {}", content.length());

                return content;
            } catch (AiServiceException e) {
                throw e;
            } catch (Exception e) {
                logger.error("Gemini AI service call failed: {}", e.getMessage(), e);
                throw new AiServiceException("Failed to call Gemini AI service: " + e.getMessage(), e);
            }
        }
    }

    public static class MockAiClient implements AiClient {
        @Override
        public String generateText(String prompt) {
            String sample = "{\n" +
                "  \"personalInformation\": {\"fullName\": \"John Doe\", \"email\": \"john@example.com\", \"phoneNumber\": \"+1 555-1234\", \"location\": \"Remote\"},\n" +
                "  \"summary\": \"Aspiring software engineer with strong Java and Spring skills\",\n" +
                "  \"skills\": [ {\"title\": \"Java\", \"level\": \"Proficient\"}, {\"title\": \"Spring Boot\", \"level\": \"Proficient\"} ],\n" +
                "  \"experience\": [ {\"jobTitle\": \"Intern\", \"company\": \"ABC Corp\", \"location\": \"Remote\", \"duration\": \"2023\", \"responsibility\": \"Built REST APIs\"} ],\n" +
                "  \"education\": [ {\"degree\": \"B.Tech CS\", \"university\": \"XYZ University\", \"location\": \"City\", \"graduationYear\": \"2024\"} ],\n" +
                "  \"certifications\": [],\n" +
                "  \"projects\": [ {\"title\": \"Resume AI\", \"description\": \"AI-based resume builder\", \"technologiesUsed\": [\"Java\", \"Spring\"], \"githubLink\": null} ],\n" +
                "  \"achievements\": [],\n" +
                "  \"languages\": [ {\"name\": \"English\"} ],\n" +
                "  \"interests\": [ {\"name\": \"Coding\"} ]\n" +
                "}";
            if (prompt.toLowerCase().contains("interview")) {
                return "{\n" +
                    "  \"summary\": \"Focus on your Java projects and data structures\",\n" +
                    "  \"questions\": [\n" +
                    "    {\"question\": \"Explain JVM memory model\", \"category\": \"Java\", \"difficulty\": \"Medium\"},\n" +
                    "    {\"question\": \"What is Dependency Injection?\", \"category\": \"Spring\", \"difficulty\": \"Easy\"}\n" +
                    "  ]\n" +
                    "}";
            }
            return sample;
        }
    }

    public static class GeminiRequest {
        public List<Content> contents;
        public GenerationConfig generationConfig;

        public GeminiRequest(List<Content> contents, GenerationConfig generationConfig) {
            this.contents = contents;
            this.generationConfig = generationConfig;
        }

        public static class Content {
            public List<Part> parts;

            public Content(List<Part> parts) {
                this.parts = parts;
            }
        }

        public static class Part {
            public String text;

            public Part(String text) {
                this.text = text;
            }
        }

        public static class GenerationConfig {
            public int maxOutputTokens;
            public float temperature;

            public GenerationConfig(int maxOutputTokens, float temperature) {
                this.maxOutputTokens = maxOutputTokens;
                this.temperature = temperature;
            }
        }
    }

    public static class GeminiResponse {
        public List<Candidate> candidates;

        public static class Candidate {
            public Content content;
            @JsonProperty("finishReason")
            public String finishReason;
        }

        public static class Content {
            public List<Part> parts;
        }

        public static class Part {
            public String text;
        }
    }

    public static class AiServiceException extends Exception {
        public AiServiceException(String message) {
            super(message);
        }

        public AiServiceException(String message, Throwable cause) {
            super(message, cause);
        }
    }
}


