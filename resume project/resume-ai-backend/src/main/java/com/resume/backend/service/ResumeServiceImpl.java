package com.resume.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.resume.backend.config.AiConfig.AiClient;
import com.resume.backend.dto.InterviewPreparationDTO;
import com.resume.backend.dto.InterviewQuestionDTO;
import com.resume.backend.dto.ResumeDTO;
import com.resume.backend.util.InputSanitizer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Service
public class ResumeServiceImpl implements ResumeService {
    private static final Logger logger = LoggerFactory.getLogger(ResumeServiceImpl.class);
    
    private final AiClient aiClient;
    private final int maxPromptLength;
    private final Resource promptResource;
    private final Resource interviewPromptResource;
    private final ObjectMapper objectMapper;
    private final InputSanitizer inputSanitizer;

    public ResumeServiceImpl(
            AiClient aiClient,
            @Value("classpath:resume_prompt.txt") Resource promptResource,
            @Value("classpath:interview_prompt.txt") Resource interviewPromptResource,
            @Value("${app.prompt.max-length:2000}") int maxPromptLength,
            ObjectMapper objectMapper,
            InputSanitizer inputSanitizer) {
        this.aiClient = aiClient;
        this.promptResource = promptResource;
        this.interviewPromptResource = interviewPromptResource;
        this.maxPromptLength = maxPromptLength;
        this.objectMapper = objectMapper;
        this.inputSanitizer = inputSanitizer;
    }

    @Override
    public ResumeDTO generateResumeResponse(String userResumeDescription) throws IOException {
        if (userResumeDescription == null || userResumeDescription.trim().isEmpty()) {
            throw new IllegalArgumentException("User description cannot be empty");
        }

        // Sanitize and validate input
        String sanitizedDescription = inputSanitizer.sanitizeUserInput(userResumeDescription);
        if (!inputSanitizer.isValidInput(sanitizedDescription)) {
            throw new IllegalArgumentException("Invalid input detected. Please provide a clean description.");
        }

        String promptTemplate = FileCopyUtils.copyToString(
                new InputStreamReader(promptResource.getInputStream(), StandardCharsets.UTF_8));
        String prompt = promptTemplate.replace("{{userDescription}}", truncateDescription(sanitizedDescription));
        
        try {
            logger.info("Generating resume from user description");
            logger.info("USER DESCRIPTION: {}", sanitizedDescription);
            logger.info("FULL PROMPT TO AI: {}", prompt);
            String aiResponse = aiClient.generateText(prompt);
            return parseAndValidateAiResponse(aiResponse);
        } catch (Exception e) {
            logger.error("Resume generation failed", e);
            throw new IOException("Failed to generate resume: " + e.getMessage(), e);
        }
    }

    @Override
    public InterviewPreparationDTO generateInterviewQuestions(String resumeContent, String jobDescription)
            throws IOException {
        if (resumeContent == null || resumeContent.trim().isEmpty()) {
            throw new IllegalArgumentException("Resume content cannot be empty");
        }

        // Sanitize and validate inputs
        String sanitizedResumeContent = inputSanitizer.sanitizeUserInput(resumeContent);
        if (!inputSanitizer.isValidInput(sanitizedResumeContent)) {
            throw new IllegalArgumentException("Invalid resume content detected. Please provide clean content.");
        }

        String sanitizedJobDescription = null;
        if (jobDescription != null && !jobDescription.trim().isEmpty()) {
            sanitizedJobDescription = inputSanitizer.sanitizeUserInput(jobDescription);
            if (!inputSanitizer.isValidInput(sanitizedJobDescription)) {
                throw new IllegalArgumentException("Invalid job description detected. Please provide clean content.");
            }
        }

        String promptTemplate = FileCopyUtils.copyToString(
                new InputStreamReader(interviewPromptResource.getInputStream(), StandardCharsets.UTF_8));

        String prompt = promptTemplate
                .replace("{{resumeContent}}", truncateDescription(sanitizedResumeContent))
                .replace("{{jobDescription}}",
                    (sanitizedJobDescription != null && !sanitizedJobDescription.isEmpty()) ?
                    truncateDescription(sanitizedJobDescription) : "Not specified");

        try {
            logger.info("Generating interview questions based on resume");
            String aiResponse = aiClient.generateText(prompt);
            return parseInterviewResponse(aiResponse);
        } catch (Exception e) {
            logger.error("Interview questions generation failed", e);
            throw new IOException("Failed to generate interview questions: " + e.getMessage(), e);
        }
    }

    private InterviewPreparationDTO parseInterviewResponse(String aiResponse) 
            throws JsonProcessingException {
        JsonNode rootNode = extractJsonNode(aiResponse);
        
        if (!rootNode.has("questions") || !rootNode.get("questions").isArray()) {
            throw new RuntimeException("Invalid AI response structure: missing or invalid 'questions' array");
        }
        if (!rootNode.has("summary")) {
            throw new RuntimeException("Invalid AI response structure: missing 'summary' field");
        }

        InterviewPreparationDTO interviewDTO = new InterviewPreparationDTO();
        interviewDTO.setSummary(rootNode.get("summary").asText());
        
        List<InterviewQuestionDTO> questions = new ArrayList<>();
        for (JsonNode questionNode : rootNode.get("questions")) {
            if (!questionNode.has("question") || !questionNode.has("category") || 
                !questionNode.has("difficulty")) {
                throw new RuntimeException("Invalid question structure in AI response");
            }
            
            InterviewQuestionDTO question = new InterviewQuestionDTO();
            question.setQuestion(questionNode.get("question").asText());
            question.setCategory(questionNode.get("category").asText());
            question.setDifficulty(questionNode.get("difficulty").asText());
            
            if (questionNode.has("hint") && !questionNode.get("hint").isNull()) {
                question.setHint(questionNode.get("hint").asText());
            }
            
            questions.add(question);
        }
        
        interviewDTO.setQuestions(questions);
        return interviewDTO;
    }

    private ResumeDTO parseAndValidateAiResponse(String aiResponse) throws JsonProcessingException {
        JsonNode rootNode = extractJsonNode(aiResponse);
        validateAndFixStructure((ObjectNode) rootNode);
        return objectMapper.treeToValue(rootNode, ResumeDTO.class);
    }

    private JsonNode extractJsonNode(String rawResponse) throws JsonProcessingException {
        if (rawResponse == null || rawResponse.contains("__proto__") || rawResponse.contains("constructor")) {
            logger.error("Potentially malicious input detected");
            throw new JsonProcessingException("Invalid input") {};
        }
        
        try {
            return objectMapper.readTree(rawResponse);
        } catch (JsonProcessingException e) {
            logger.warn("Direct JSON parsing failed, trying extraction: {}", e.getMessage());
        }
        
        int start = rawResponse.indexOf('{');
        int end = rawResponse.lastIndexOf('}');
        if (start >= 0 && end > start) {
            String jsonCandidate = rawResponse.substring(start, end + 1);
            return objectMapper.readTree(jsonCandidate);
        }
        
        throw new JsonProcessingException("No valid JSON found in AI response") {};
    }

    private void validateAndFixStructure(ObjectNode rootNode) {
        String[] sections = {
            "personalInformation", "summary", "skills", "experience", 
            "education", "certifications", "projects", 
            "achievements", "languages", "interests"
        };
        
        for (String section : sections) {
            if (!rootNode.has(section)) {
                rootNode.putObject(section);
            }
        }

        JsonNode personalNode = rootNode.get("personalInformation");
        if (personalNode == null || !personalNode.isObject()) {
            rootNode.putObject("personalInformation");
            personalNode = rootNode.get("personalInformation");
        }
        ObjectNode personalInfo = (ObjectNode) personalNode;
        String[] personalFields = {
            "fullName", "email", "phoneNumber", "location",
            "linkedIn", "gitHub", "portfolio"
        };
        for (String field : personalFields) {
            if (!personalInfo.has(field)) {
                if (field.equals("linkedIn") || field.equals("gitHub") || field.equals("portfolio")) {
                    personalInfo.putNull(field);
                } else {
                    personalInfo.put(field, "");
                }
            }
        }

        normalizeSkillsArray(rootNode);
        normalizeArray(rootNode, "experience", 
            "jobTitle", "company", "location", "duration", "responsibility");
        normalizeArray(rootNode, "education", 
            "degree", "university", "location", "graduationYear");
        normalizeArray(rootNode, "certifications", 
            "title", "issuingOrganization", "year");
        normalizeArray(rootNode, "projects", 
            "title", "description", "technologiesUsed", "githubLink");
        normalizeArray(rootNode, "achievements", 
            "title", "year", "extraInformation");
        normalizeSimpleArray(rootNode, "languages", "name");
        normalizeSimpleArray(rootNode, "interests", "name");
    }

    private void normalizeSkillsArray(ObjectNode rootNode) {
        if (!rootNode.has("skills")) {
            rootNode.putArray("skills");
            return;
        }

        JsonNode skillsNode = rootNode.get("skills");
        if (!skillsNode.isArray()) {
            rootNode.putArray("skills");
            return;
        }

        ArrayNode newSkills = objectMapper.createArrayNode();
        for (JsonNode skill : skillsNode) {
            if (skill.isTextual()) {
                ObjectNode newSkill = objectMapper.createObjectNode();
                newSkill.put("title", skill.asText());
                newSkill.put("level", "Proficient");
                newSkills.add(newSkill);
            } else if (skill.isObject()) {
                newSkills.add(skill);
            }
        }
        rootNode.set("skills", newSkills);
    }

    private void normalizeArray(ObjectNode parent, String fieldName, String... keys) {
        if (!parent.has(fieldName)) {
            parent.putArray(fieldName);
            return;
        }

        JsonNode node = parent.get(fieldName);
        if (!node.isArray()) {
            parent.putArray(fieldName);
            return;
        }

        ArrayNode arrayNode = (ArrayNode) node;
        for (int i = 0; i < arrayNode.size(); i++) {
            JsonNode item = arrayNode.get(i);
            if (item.isObject()) {
                ObjectNode obj = (ObjectNode) item;
                for (String key : keys) {
                    if (!obj.has(key)) {
                        if (key.equals("technologiesUsed")) {
                            obj.putArray(key);
                        } else if (key.equals("githubLink")) {
                            obj.putNull(key);
                        } else {
                            obj.put(key, "");
                        }
                    } else if (key.equals("technologiesUsed") && !obj.get(key).isArray()) {
                        ArrayNode techArray = objectMapper.createArrayNode();
                        if (obj.get(key).isTextual()) {
                            techArray.add(obj.get(key).asText());
                        }
                        obj.set(key, techArray);
                    }
                }
            }
        }
    }

    private void normalizeSimpleArray(ObjectNode parent, String fieldName, String valueField) {
        if (!parent.has(fieldName)) {
            parent.putArray(fieldName);
            return;
        }

        JsonNode node = parent.get(fieldName);
        if (!node.isArray()) {
            parent.putArray(fieldName);
            return;
        }

        ArrayNode oldArray = (ArrayNode) node;
        ArrayNode newArray = objectMapper.createArrayNode();

        for (JsonNode item : oldArray) {
            if (item.isObject()) {
                ObjectNode obj = (ObjectNode) item;
                if (!obj.has(valueField)) {
                    obj.put(valueField, "");
                }
                if (obj.has("id")) {
                    obj.remove("id");
                }
                newArray.add(obj);
            } else if (item.isTextual()) {
                ObjectNode newItem = objectMapper.createObjectNode();
                newItem.put(valueField, item.asText());
                newArray.add(newItem);
            }
        }

        parent.set(fieldName, newArray);
    }

    private String truncateDescription(String description) {
        return description.length() > maxPromptLength 
            ? description.substring(0, maxPromptLength) + "...[truncated]" 
            : description;
    }
}