package com.raunak.FirstProject.service;

import com.raunak.FirstProject.config.WeatherApiGeignClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FeignWeatherService {

    private static final String API_KEY = "df8a5315df60420a996231851250812";

    @Autowired
    private WeatherApiGeignClient weatherClient;

    public String getWeather(String city) {
        return weatherClient.getCurrentWeather(API_KEY, city);
    }
}
