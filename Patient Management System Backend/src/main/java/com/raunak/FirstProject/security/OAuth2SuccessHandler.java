package com.raunak.FirstProject.security;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.raunak.FirstProject.model.User;
import com.raunak.FirstProject.Repository.UserRepository;


@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final JwtUtil jwtService;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException, ServletException {

        // Extract OAuth2 user info from Google
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        // Find existing user or create new one
        User user = userRepository.findByEmail(email)
            .orElseGet(() -> {
                User newUser = new User();
                newUser.setEmail(email);
                newUser.setUsername(name);
                newUser.setProvider("GOOGLE"); // LOCAL / GOOGLE
                return userRepository.save(newUser);
            });

        // Generate YOUR application's JWT
        String jwt = jwtService.generateToken(user);

        // Redirect to Next.js frontend with JWT
        response.sendRedirect(
            "http://localhost:3000/oauth-success?token=" + jwt
        );
    }
}
