package com.raunak.FirstProject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.raunak.FirstProject.service.WeatherService;

@RestController
public class WeatherApiController {
    
    @Autowired
    private WeatherService weatherService;

    @GetMapping("/weather/{city}")
    public String getWeather(@PathVariable String city) {
        return weatherService.getWeather(city);
    }
    
    // example to make api call "https://api.weatherapi.com/v1/current.json?key=df8a5315df60420a996231851250812&q=Delhi"
    // Wensite https://www.weatherapi.com/my/
    //docs https://www.weatherapi.com/docs/ 
    //GET http://localhost:8080/weather/Delhi
}
