package com.schemeengine.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class SchemeRule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fieldName;   // income, caste, age
    private String operator;    // <, >, =, IN
    private String value;

    @ManyToOne
    private Scheme scheme;
}
