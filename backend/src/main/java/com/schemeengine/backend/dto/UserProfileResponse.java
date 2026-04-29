package com.schemeengine.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileResponse {

    private int age;
    private double income;
    private String caste;
    private String occupation;
    private String state;

    private String name;
    private String email;
}