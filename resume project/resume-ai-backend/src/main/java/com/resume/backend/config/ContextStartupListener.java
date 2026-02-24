package com.resume.backend.config;


import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

@Component
public class ContextStartupListener implements ApplicationListener<ContextRefreshedEvent> {

    private final SmartHealthIndicator smartHealthIndicator;

    public ContextStartupListener(SmartHealthIndicator smartHealthIndicator) {
        this.smartHealthIndicator = smartHealthIndicator;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        smartHealthIndicator.setContextReady();
    }
}
