package com.schemeengine.backend.dto;

import lombok.Data;

@Data
public class UserProfileRequest {

    private int age;
    private double income;
    private String caste;
    private String occupation;
    private String state;
}