package com.raunak.FirstProject.controller;

import com.raunak.FirstProject.DTO.LoginRequestDTO;
import com.raunak.FirstProject.DTO.RegisterRequestDTO;
import com.raunak.FirstProject.DTO.UserDTO;
import com.raunak.FirstProject.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody RegisterRequestDTO registerRequest) {
        UserDTO userDTO = authService.register(registerRequest);
        return ResponseEntity.ok(userDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody LoginRequestDTO loginRequest) {
        UserDTO userDTO = authService.login(loginRequest);
        return ResponseEntity.ok(userDTO);
    }
}
