package com.vegarden.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.vegarden.backend.models.Article;
import com.vegarden.backend.models.ArticleReaction;
import com.vegarden.backend.models.Zenyte;

import jakarta.transaction.Transactional;

public interface ArticleReactionRepository extends JpaRepository<ArticleReaction, Long> {

    List<ArticleReaction> findByArticleId(Long articleId);

    boolean existsByArticleAndAuthor(Article article, Zenyte author);

    @Transactional
    void deleteByArticleAndAuthor(Article article, Zenyte author);
}
