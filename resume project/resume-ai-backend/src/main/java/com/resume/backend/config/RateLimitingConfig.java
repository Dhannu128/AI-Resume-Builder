package com.resume.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Configuration
public class RateLimitingConfig implements WebMvcConfigurer {

    @Bean
    public RateLimitingInterceptor rateLimitingInterceptor() {
        return new RateLimitingInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(rateLimitingInterceptor())
                .addPathPatterns("/api/v1/resume/**");
    }

    public static class RateLimitingInterceptor implements HandlerInterceptor {
        private static final int MAX_REQUESTS_PER_MINUTE = 10;
        private final ConcurrentHashMap<String, AtomicInteger> requestCounts = new ConcurrentHashMap<>();
        private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

        public RateLimitingInterceptor() {
            // Reset counters every minute
            scheduler.scheduleAtFixedRate(() -> {
                requestCounts.clear();
            }, 1, 1, TimeUnit.MINUTES);
        }

        @Override
        public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
            String clientIp = getClientIpAddress(request);
            AtomicInteger count = requestCounts.computeIfAbsent(clientIp, k -> new AtomicInteger(0));
            
            if (count.incrementAndGet() > MAX_REQUESTS_PER_MINUTE) {
                response.setStatus(429); // Too Many Requests
                response.setContentType("application/json");
                response.getWriter().write("{\"status\":\"error\",\"message\":\"Rate limit exceeded. Please try again later.\",\"data\":null}");
                return false;
            }
            
            return true;
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
