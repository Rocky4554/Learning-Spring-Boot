package com.raunak.FirstProject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import com.raunak.FirstProject.service.FeignWeatherService;
@RestController
public class FeignWeatherApiCOntroller {

    
    @Autowired
    private  FeignWeatherService weatherService;

    @GetMapping("/feignweather/{city}")
    public String getWeather(@PathVariable String city) {
        return weatherService.getWeather(city);
    }

}
