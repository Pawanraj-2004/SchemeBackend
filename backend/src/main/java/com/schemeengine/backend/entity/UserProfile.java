package com.schemeengine.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int age;
    private double income;
    private String caste;
    private String occupation;
    private String state;

    // 🔗 Link to User
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}