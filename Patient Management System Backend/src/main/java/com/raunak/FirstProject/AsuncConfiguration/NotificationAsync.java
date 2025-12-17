package com.raunak.FirstProject.AsuncConfiguration;

import java.util.concurrent.Executor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
@Configuration
@EnableAsync
public class NotificationAsync {

     @Bean(name = "notificationExecutor")
    public Executor notificationExecutor() {

        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();

        executor.setCorePoolSize(5);       // minimum threads
        executor.setMaxPoolSize(10);       // max threads
        executor.setQueueCapacity(50);     // tasks waiting in queue
        executor.setThreadNamePrefix("Notify-"); 

        executor.initialize();
        return executor;
    }
}


// What this thread pool means:

// At least 5 threads always running

// It can grow to 10 threads under load

// Extra 50 tasks can wait

// Threads will be named like: Notify-1, Notify-2 (very useful in logs)
