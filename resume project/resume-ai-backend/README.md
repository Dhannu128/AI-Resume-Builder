# Resume AI Backend

A Spring Boot backend service that powers AI-driven resume generation using Google Gemini AI.

## Features

- **AI-Powered Resume Generation**: Leverages Google Gemini AI's advanced language models
- **RESTful API**: Clean, well-documented REST endpoints
- **Rate Limiting**: Built-in protection against abuse
- **CORS Support**: Configurable cross-origin resource sharing
- **Health Monitoring**: Actuator endpoints for monitoring
- **Error Handling**: Comprehensive error handling and logging
- **Security**: Spring Security integration
- **Database Support**: Optional database integration
- **Docker Ready**: Containerized deployment support

## Quick Start

1. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env and add your Gemini API key
   ```

2. **Run the application**:
   ```bash
   ./start-backend.sh
   ```

3. **Test the API**:
   ```bash
   curl -X POST http://localhost:8080/api/v1/resume \
     -H "Content-Type: application/json" \
     -d '{"userDescription":"I am a software engineer with 3 years of experience"}'
   ```

## Environment Variables

- `GEMINI_API_KEY`: Your Google Gemini API key (required)
- `GEMINI_MODEL`: AI model to use (default: gemini-1.5-flash)
- `GEMINI_MAX_TOKENS`: Maximum tokens per request (default: 2000)
- `GEMINI_TEMPERATURE`: AI temperature setting (default: 0.7)

## API Endpoints

- `POST /api/v1/resume` - Generate a resume from user description
- `GET /actuator/health` - Health check endpoint

For detailed API documentation, see [API_DOCUMENTATION.md](API_DOCUMENTATION.md).

## Technology Stack

- **Java 17**
- **Spring Boot 3.3.6**
- **Spring Security**
- **Spring Web**
- **Jackson** for JSON processing
- **WebFlux** for reactive HTTP calls
- **Maven** for dependency management

## Development

```bash
# Run in development mode
./mvnw spring-boot:run

# Run tests
./mvnw test

# Build JAR
./mvnw clean package
```

## Deployment

The application can be deployed using Docker or as a standalone JAR file. See the deployment documentation for more details.
