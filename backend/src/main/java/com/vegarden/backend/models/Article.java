/**
 * Represents an article published on a zenyte's personal blog on the
 * Vegarden platform.
 * Contains information about the article, such as the title, description,
 * body, and creation and update timestamps.
 * Additionally, has a ManyToOne relationship with the Blog class,
 * representing the blog on which the article was published.
 * Also has a ManyToMany relationship with the Zenyte class,
 * representing the collaborators who contributed to the article.
 * Finally, has a ManyToOne relationship with the Zenyte class,
 * representing the author of the article.
 */

package com.vegarden.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "articles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(name = "cover_image_url")
    private String coverImageURL;

    @Column
    private String description;

    @Column(columnDefinition = "text", nullable = false)
    private String body;

    @Column(nullable = false, columnDefinition = "bigint default 0")
    private Long reactions;

    @Column(nullable = false)
    private Timestamp createdAt;

    @Column
    private Timestamp updatedAt;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "blog_id", nullable = false)
    private Blog blog;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "author_id", nullable = false)
    private Zenyte author;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinTable(name = "article_collaborators", joinColumns = @JoinColumn(name = "article_id"), inverseJoinColumns = @JoinColumn(name = "zenyte_id"))
    private Set<Zenyte> collaborators = new HashSet<>();

}
