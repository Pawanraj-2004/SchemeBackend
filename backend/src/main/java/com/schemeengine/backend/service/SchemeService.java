package com.schemeengine.backend.service;

import com.schemeengine.backend.dto.SchemeResponse;
import com.schemeengine.backend.entity.Role;
import com.schemeengine.backend.entity.Scheme;
import com.schemeengine.backend.entity.User;
import com.schemeengine.backend.entity.UserProfile;
import com.schemeengine.backend.repository.SchemeRepository;
import com.schemeengine.backend.repository.UserProfileRepository;
import com.schemeengine.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SchemeService {

    private final SchemeRepository schemeRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserProfileRepository profileRepository;

    @Autowired
    private JwtService jwtService;

    // Add scheme (Admin use)
    public Scheme addScheme(String token, Scheme scheme) {

        String email = jwtService.extractEmail(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole() != Role.ADMIN) {
            throw new RuntimeException("Access denied");
        }

        return schemeRepository.save(scheme);
    }

    // Get all schemes
    public List<Scheme> getAllSchemes() {
        return schemeRepository.findAll();
    }

    public List<Scheme> getEligibleSchemes(UserProfile profile) {

        List<Scheme> allSchemes = schemeRepository.findAll();

        return allSchemes.stream()
                .filter(scheme -> isEligible(profile, scheme))
                .toList();
    }

    private boolean isEligible(UserProfile user, Scheme scheme) {

        // Income check
        if (scheme.getMinIncome() != null && user.getIncome() < scheme.getMinIncome()) {
            return false;
        }
        if (scheme.getMaxIncome() != null && user.getIncome() > scheme.getMaxIncome()) {
            return false;
        }

        // Age check
        if (scheme.getMinAge() != null && user.getAge() < scheme.getMinAge()) {
            return false;
        }
        if (scheme.getMaxAge() != null && user.getAge() > scheme.getMaxAge()) {
            return false;
        }

        // Caste check
        if (scheme.getCaste() != null &&
                !scheme.getCaste().equalsIgnoreCase("ALL") &&
                !scheme.getCaste().equalsIgnoreCase(user.getCaste())) {
            return false;
        }

        // State check
        if (scheme.getState() != null &&
                !scheme.getState().equalsIgnoreCase("ALL") &&
                !scheme.getState().equalsIgnoreCase(user.getState())) {
            return false;
        }

        // Occupation check
        if (scheme.getOccupation() != null &&
                !scheme.getOccupation().equalsIgnoreCase("ALL") &&
                !scheme.getOccupation().equalsIgnoreCase(user.getOccupation())) {
            return false;
        }

        return true;
    }

    public List<SchemeResponse> getEligibleSchemesForUser(String token) {

        String email = jwtService.extractEmail(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserProfile profile = profileRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        return getEligibleSchemes(profile)
                .stream()
                .sorted((s1, s2) -> calculateScore(profile, s2) - calculateScore(profile, s1))
                .map(this::mapToResponse)
                .toList();
    }

    private int calculateScore(UserProfile user, Scheme scheme) {

        int score = 0;

        // Exact state match → high weight
        if (scheme.getState() != null &&
                scheme.getState().equalsIgnoreCase(user.getState())) {
            score += 30;
        }

        // Exact caste match
        if (scheme.getCaste() != null &&
                scheme.getCaste().equalsIgnoreCase(user.getCaste())) {
            score += 25;
        }

        // Occupation match
        if (scheme.getOccupation() != null &&
                scheme.getOccupation().equalsIgnoreCase(user.getOccupation())) {
            score += 20;
        }

        // Income closeness (better targeting)
        if (scheme.getMaxIncome() != null) {
            double diff = scheme.getMaxIncome() - user.getIncome();
            if (diff >= 0 && diff < 100000) {
                score += 15;
            }
        }

        // Age range tight match
        if (scheme.getMinAge() != null && scheme.getMaxAge() != null) {
            if (user.getAge() >= scheme.getMinAge() &&
                    user.getAge() <= scheme.getMaxAge()) {
                score += 10;
            }
        }

        return score;
    }

    private SchemeResponse mapToResponse(Scheme scheme) {
        return SchemeResponse.builder()
                .name(scheme.getName())
                .description(scheme.getDescription())
                .minIncome(scheme.getMinIncome())
                .maxIncome(scheme.getMaxIncome())
                .caste(scheme.getCaste())
                .state(scheme.getState())
                .minAge(scheme.getMinAge())
                .maxAge(scheme.getMaxAge())
                .occupation(scheme.getOccupation())
                .build();
    }
}