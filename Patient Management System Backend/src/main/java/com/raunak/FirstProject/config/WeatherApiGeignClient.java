package com.raunak.FirstProject.config;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(
        name = "weatherClient",
        url = "https://api.weatherapi.com/v1"
)
public interface WeatherApiGeignClient {

    @GetMapping("/current.json")
    String getCurrentWeather(
            @RequestParam("key") String apiKey,
            @RequestParam("q") String city
    );
}
