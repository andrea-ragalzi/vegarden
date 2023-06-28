package com.vegarden.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vegarden.backend.models.ArticleReaction;

public interface ArticleReactionRepository extends JpaRepository<ArticleReaction, Long> {

    List<ArticleReaction> findByArticleId(Long articleId);
}
