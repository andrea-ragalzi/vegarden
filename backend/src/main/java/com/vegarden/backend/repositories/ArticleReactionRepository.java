package com.vegarden.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.vegarden.backend.models.Article;
import com.vegarden.backend.models.ArticleReaction;
import com.vegarden.backend.models.Zenyte;

import jakarta.transaction.Transactional;

public interface ArticleReactionRepository extends JpaRepository<ArticleReaction, Long> {

    public List<ArticleReaction> findByArticleId(Long articleId);

    public boolean existsByArticleAndAuthor(Article article, Zenyte author);

    @Transactional
    public void deleteByArticleAndAuthor(Article article, Zenyte author);

    @Modifying
    @Query("DELETE FROM ArticleReaction asv WHERE asv.article.id = :articleId")
    @Transactional
    public void deleteByArticleId(@Param("articleId") Long articleId);
}
