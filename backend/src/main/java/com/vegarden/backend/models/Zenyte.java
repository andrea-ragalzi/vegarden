package com.vegarden.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * This file contains the Zenyte class, which represents a user of the
 * Vegarden platform.
 * The Zenyte class contains basic profile information for the user,
 * such as the username,
 * email address, password, and creation date. Additionally, the Zenyte class
 * has a OneToOne relationship with the Profile and Blog classes,
 * which represent the user's public profile and personal blog, respectively.
 */

import java.sql.Timestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "zenytes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Zenyte {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private Timestamp createdAt;

    @Column
    private Timestamp updatedAt;

    @OneToOne(mappedBy = "zenyte", cascade = CascadeType.ALL)
    private Profile profile;

    @OneToOne(mappedBy = "zenyte", cascade = CascadeType.ALL)
    private Blog blog;
}
