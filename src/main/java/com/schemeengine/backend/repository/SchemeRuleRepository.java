package com.schemeengine.backend.repository;

import com.schemeengine.backend.entity.SchemeRule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SchemeRuleRepository extends JpaRepository<SchemeRule, Long> {
    List<SchemeRule> findBySchemeId(Long schemeId);
}
