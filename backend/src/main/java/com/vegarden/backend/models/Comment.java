/**
 * Represents a comment made by a zenyte on an article in the
 * Vegarden platform.
 * Contains a ManyToOne relationship with the Article class, representing
 * the article to which the comment was posted, and a ManyToOne relationship
 * with the Zenyte class, representing the zenyte who posted the comment.
 * Also has a body property containing the text of the comment,
 * and a disabled property indicating whether the comment has been disabled.
 * Also has a "createdAt" timestamp indicating the moment the
 * comment was posted.
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
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Table(name = "comments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id", nullable = false)
    private Article article;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Zenyte author;

    @Column(nullable = false)
    private String body;

    @Column(nullable = false)
    private Boolean disabled;

    @Column(nullable = false)
    private Timestamp createdAt;

}
