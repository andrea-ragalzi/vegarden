/**
 * Represents a user profile on the Vegarden platform.
 * Contains basic information about the user, such as first name, middle name,
 * last name, pronouns, bio, location, avatar image and cover image.
 * Additionally, has a OneToOne relationship with the Zenyte class,
 * representing the owner of the profile.
 */

package com.vegarden.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstname;

    @Column
    private String middlename;

    @Column(nullable = false)
    private String lastname;


    @Column
    private String pronouns;

    @Column
    private String bio;

    @Column
    private String location;

    @Column
    private String avatarImage;

    @Column
    private String coverImage;

    @Column(nullable = false)
    private Timestamp createdAt;

    private Timestamp updatedAt;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "zenyte_id", referencedColumnName = "id", nullable = false)
    private Zenyte owner;
}
