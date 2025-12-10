package com.raunak.FirstProject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;   // IMPORTANT
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableFeignClients  // Enables Feign client scanning
public class FirstProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(FirstProjectApplication.class, args);
    }

    // OPTIONAL — only needed if you still use RestTemplate somewhere
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
