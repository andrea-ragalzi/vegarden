/**
 * This class represents a user of the Vegarden platform.
 * The Zenyte class contains basic profile information for the user,
 * such as the username, email address, password, and creation date.
 * Additionally, the Zenyte class has a OneToOne relationship with the Profile and Blog classes,
 * which represent the user's public profile and personal blog, respectively.
 * The Zenyte class also has a ManyToMany relationship with the Role class,
 * which represents the roles assigned to the user.
 */

package com.vegarden.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinTable(name = "zenyte_roles", joinColumns = @JoinColumn(name = "zenyte_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "role"))
    private Set<Role> roles;

    @Column(nullable = false)
    private Timestamp createdAt;

    @Column
    private Timestamp updatedAt;

}
