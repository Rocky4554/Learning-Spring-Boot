package com.raunak.FirstProject.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.http.MediaType;

@Controller
public class LoginController {

    @GetMapping(value = "/api/login", produces = MediaType.TEXT_HTML_VALUE)
    public String login() {
        return "forward:/login.html";
    }
}
