package com.schemeengine.backend.controller;

import com.schemeengine.backend.entity.User;
import com.schemeengine.backend.repository.UserRepository;
import com.schemeengine.backend.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/me")
    public User getCurrentUser(@RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7); // remove "Bearer "
        String email = jwtService.extractEmail(token);

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}