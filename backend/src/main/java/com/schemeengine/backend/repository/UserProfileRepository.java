package com.schemeengine.backend.repository;

import com.schemeengine.backend.entity.User;
import com.schemeengine.backend.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

    Optional<UserProfile> findByUser(User user);
}