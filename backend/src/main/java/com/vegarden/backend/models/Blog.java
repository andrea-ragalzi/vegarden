/**
 * Represents a Zenyte's personal blog on the Vegarden platform.
 * Contains basic information about the blog, such as the title and
 * description, as well as the creation and update timestamps.
 * Additionally, has a OneToOne relationship with the Zenyte class,
 * representing the owner of the blog, and a OneToMany relationship with
 * the Article class, representing the articles published on the blog.
 */

package com.vegarden.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "blogs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column
    private String description;

    @Column(nullable = false)
    private Timestamp createdAt;

    @Column
    private Timestamp updatedAt;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "zenyte_id", referencedColumnName = "id", nullable = false)
    private Zenyte owner;
    
    @JsonIgnore
    @OneToMany(mappedBy = "blog", cascade = CascadeType.MERGE, orphanRemoval = true)
    private List<Article> articles;
}
