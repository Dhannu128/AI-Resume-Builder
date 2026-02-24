package com.resume.backend.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class LoggingConfig implements WebMvcConfigurer {

    @Bean
    public RequestLoggingInterceptor requestLoggingInterceptor() {
        return new RequestLoggingInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(requestLoggingInterceptor())
                .addPathPatterns("/api/**");
    }

    public static class RequestLoggingInterceptor implements HandlerInterceptor {
        private static final Logger logger = LoggerFactory.getLogger(RequestLoggingInterceptor.class);

        @Override
        public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
            long startTime = System.currentTimeMillis();
            request.setAttribute("startTime", startTime);
            
            String clientIp = getClientIpAddress(request);
            String userAgent = request.getHeader("User-Agent");
            
            logger.info("Incoming request: {} {} from IP: {} User-Agent: {}", 
                       request.getMethod(), 
                       request.getRequestURI(), 
                       clientIp,
                       userAgent != null ? userAgent.substring(0, Math.min(userAgent.length(), 100)) : "Unknown");
            
            return true;
        }

        @Override
        public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
            Long startTime = (Long) request.getAttribute("startTime");
            if (startTime != null) {
                long duration = System.currentTimeMillis() - startTime;
                
                logger.info("Request completed: {} {} - Status: {} - Duration: {}ms", 
                           request.getMethod(), 
                           request.getRequestURI(), 
                           response.getStatus(),
                           duration);
                
                if (duration > 5000) { // Log slow requests
                    logger.warn("Slow request detected: {} {} took {}ms", 
                               request.getMethod(), 
                               request.getRequestURI(), 
                               duration);
                }
            }
            
            if (ex != null) {
                logger.error("Request failed: {} {} - Error: {}", 
                            request.getMethod(), 
                            request.getRequestURI(), 
                            ex.getMessage());
            }
        }

        private String getClientIpAddress(HttpServletRequest request) {
            String xForwardedFor = request.getHeader("X-Forwarded-For");
            if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
                return xForwardedFor.split(",")[0].trim();
            }
            
            String xRealIp = request.getHeader("X-Real-IP");
            if (xRealIp != null && !xRealIp.isEmpty()) {
                return xRealIp;
            }
            
            return request.getRemoteAddr();
        }
    }
}
