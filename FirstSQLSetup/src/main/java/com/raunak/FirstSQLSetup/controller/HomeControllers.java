package com.raunak.FirstSQLSetup.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeControllers {

    @GetMapping("/")
    public String greet(){
        return "Hello , This is Raunak";
    }
     @RequestMapping("/about")
    public String about() {
        return "Hello Consider myself as a batman ";
    }
}
    

