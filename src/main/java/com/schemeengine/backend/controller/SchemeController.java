package com.schemeengine.backend.controller;

import com.schemeengine.backend.dto.SchemeResponse;
import com.schemeengine.backend.entity.Scheme;
import com.schemeengine.backend.service.SchemeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schemes")
@RequiredArgsConstructor
public class SchemeController {

    private final SchemeService schemeService;

    // Add scheme
    @PostMapping
    public Scheme addScheme(
            @RequestHeader("Authorization") String token,
            @RequestBody Scheme scheme) {

        token = token.substring(7);
        return schemeService.addScheme(token, scheme);
    }

    // Get all schemes
    @GetMapping
    public List<Scheme> getAllSchemes() {
        return schemeService.getAllSchemes();
    }

    @GetMapping("/eligible")
    public List<SchemeResponse> getEligibleSchemes(
            @RequestHeader("Authorization") String token) {

        token = token.substring(7);
        return schemeService.getEligibleSchemesForUser(token);
    }
}