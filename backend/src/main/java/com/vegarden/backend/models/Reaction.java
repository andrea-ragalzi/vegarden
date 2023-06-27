/**
 * Represents a reaction given by a Zenyte to an article on the
 * Vegarden platform.
 * Contains a ManyToOne relationship with the Article class, representing
 * the article that received the reaction, and a ManyToOne relationship
 * with the Zenyte class, representing the user who gave the reaction.
 * Also has a createdAt timestamp indicating the moment the reaction was given.
 */

package com.vegarden.backend.models;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "reactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id", nullable = false)
    private Article article;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "zenyte_id", nullable = false)
    private Zenyte author;

    @Column(nullable = false)
    private Timestamp createdAt;

}
