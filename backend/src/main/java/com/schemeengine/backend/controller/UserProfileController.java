package com.schemeengine.backend.controller;

import com.schemeengine.backend.dto.UserProfileRequest;
import com.schemeengine.backend.dto.UserProfileResponse;
import com.schemeengine.backend.entity.UserProfile;
import com.schemeengine.backend.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class UserProfileController {

    private final UserProfileService profileService;

    // ✅ SAVE PROFILE
    @PostMapping
    public UserProfileResponse saveProfile(
            @RequestHeader("Authorization") String token,
            @RequestBody UserProfileRequest request) {

        token = token.substring(7); // remove Bearer
        return profileService.saveProfile(token, request);
    }

    // ✅ GET PROFILE
    @GetMapping("/me")
    public UserProfileResponse getProfile(
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);
        return profileService.getProfile(token);
    }
}