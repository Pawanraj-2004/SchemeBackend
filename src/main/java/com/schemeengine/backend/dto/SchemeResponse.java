package com.schemeengine.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SchemeResponse {

    private String name;
    private String description;

    private Double minIncome;
    private Double maxIncome;

    private String caste;
    private String state;

    private Integer minAge;
    private Integer maxAge;

    private String occupation;
}