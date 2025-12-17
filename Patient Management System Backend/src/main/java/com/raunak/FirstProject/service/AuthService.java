package com.raunak.FirstProject.service;

import com.raunak.FirstProject.DTO.LoginRequestDTO;
import com.raunak.FirstProject.DTO.RegisterRequestDTO;
import com.raunak.FirstProject.DTO.UserDTO;
import com.raunak.FirstProject.Repository.UserRepository;
import com.raunak.FirstProject.model.User;
import com.raunak.FirstProject.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthService(AuthenticationManager authenticationManager,
            JwtUtil jwtUtil,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserDTO login(LoginRequestDTO loginRequest) {
        // Authenticate user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()));

        // Get authenticated user details
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        // Generate JWT token
        String jwt = jwtUtil.generateToken(userDetails);

        // Get user from database to retrieve userId
        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Return UserDTO with JWT and userId
        return new UserDTO(user.getId(), jwt, user.getUsername());
    }

    public UserDTO register(RegisterRequestDTO registerRequest) {
        // Check if user already exists
        if (userRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        // Create new user
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword())); // Hash password

        // Save user to database
        User savedUser = userRepository.save(user);

        // Generate JWT token for immediate login
        UserDetails userDetails = savedUser;
        String jwt = jwtUtil.generateToken(userDetails);

        // Return UserDTO with JWT and userId
        return new UserDTO(savedUser.getId(), jwt, savedUser.getUsername());
    }
}
