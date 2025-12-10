package com.raunak.FirstProject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class WeatherService {

    private static final String API_KEY = "df8a5315df60420a996231851250812";
    private static final String API_URL =
            "https://api.weatherapi.com/v1/current.json?key=APIKEY&q=CITY";

    @Autowired
    private RestTemplate restTemplate;

    public String getWeather(String city) {

        // Replace placeholders
        String finalAPI = API_URL
                .replace("APIKEY", API_KEY)
                .replace("CITY", city);

        // Make GET request
        ResponseEntity<String> response =
                restTemplate.exchange(finalAPI, HttpMethod.GET, null, String.class);

        return response.getBody(); // return JSON string
    }
}
