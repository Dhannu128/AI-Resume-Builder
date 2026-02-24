package com.resume.backend.config;

import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

@Component
public class ApplicationLifecycleNotifier implements ApplicationListener<ContextRefreshedEvent> {
    private final SmartHealthIndicator healthIndicator;

    public ApplicationLifecycleNotifier(SmartHealthIndicator healthIndicator) {
        this.healthIndicator = healthIndicator;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        healthIndicator.setContextReady();
        System.out.println("=== SPRING CONTEXT FULLY INITIALIZED ===");
    }
}