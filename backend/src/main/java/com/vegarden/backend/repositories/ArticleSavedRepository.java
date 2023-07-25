package com.vegarden.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.vegarden.backend.models.Article;
import com.vegarden.backend.models.ArticleSaved;
import com.vegarden.backend.models.Zenyte;

import jakarta.transaction.Transactional;

public interface ArticleSavedRepository extends JpaRepository<ArticleSaved, Long> {

    List<Zenyte> findByAuthor(Zenyte author);

    boolean existsByArticleAndAuthor(Article article, Zenyte author);

    @Transactional
    void deleteByArticleAndAuthor(Article article, Zenyte author);

    @Query("SELECT a FROM Article a JOIN ArticleSaved asv ON a.id = asv.article.id WHERE asv.author = :author ORDER BY a.createdAt DESC")
    List<Article> findSavedArticlesByAuthorOrderByCreatedAtDesc(@Param("author") Zenyte author);

    @Modifying
    @Query("DELETE FROM ArticleSaved asv WHERE asv.article.id = :articleId")
    @Transactional
    void deleteByArticleId(@Param("articleId") Long articleId);

}
