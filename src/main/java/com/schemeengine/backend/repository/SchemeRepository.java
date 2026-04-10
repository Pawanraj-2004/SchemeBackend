package com.schemeengine.backend.repository;

import com.schemeengine.backend.entity.Scheme;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SchemeRepository extends JpaRepository<Scheme, Long> {
}