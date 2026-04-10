package com.schemeengine.backend.service;

import com.schemeengine.backend.dto.UserProfileRequest;
import com.schemeengine.backend.dto.UserProfileResponse;
import com.schemeengine.backend.entity.User;
import com.schemeengine.backend.entity.UserProfile;
import com.schemeengine.backend.repository.UserProfileRepository;
import com.schemeengine.backend.repository.UserRepository;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserProfileService {

    private final UserRepository userRepository;
    private final UserProfileRepository profileRepository;
    private final JwtService jwtService;

    // ✅ SAVE PROFILE
    public UserProfileResponse saveProfile(String token, UserProfileRequest request) {

        String email = jwtService.extractEmail(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserProfile profile = profileRepository.findByUser(user)
                .orElse(new UserProfile());

        profile.setAge(request.getAge());
        profile.setIncome(request.getIncome());
        profile.setCaste(request.getCaste());
        profile.setOccupation(request.getOccupation());
        profile.setState(request.getState());
        profile.setUser(user);

        UserProfile saved = profileRepository.save(profile);

        // 🔥 Convert to DTO
        UserProfileResponse response = new UserProfileResponse();
        response.setAge(saved.getAge());
        response.setIncome(saved.getIncome());
        response.setCaste(saved.getCaste());
        response.setOccupation(saved.getOccupation());
        response.setState(saved.getState());

        response.setName(user.getName());
        response.setEmail(user.getEmail());

        return response;
    }

    // ✅ GET PROFILE
    public UserProfileResponse getProfile(String token) {

        String email = jwtService.extractEmail(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserProfile profile = profileRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        return UserProfileResponse.builder()
                .age(profile.getAge())
                .income(profile.getIncome())
                .caste(profile.getCaste())
                .occupation(profile.getOccupation())
                .state(profile.getState())
                .name(user.getName())
                .email(user.getEmail())
                .build();
    }
}