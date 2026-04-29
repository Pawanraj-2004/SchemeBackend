package com.schemeengine.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Scheme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    // Eligibility Rules
    private Double minIncome;
    private Double maxIncome;

    private String caste;        // SC / ST / OBC / GENERAL / ALL
    private String state;        // State specific or ALL

    private Integer minAge;
    private Integer maxAge;

    private String occupation;   // Student / Farmer / ALL
}