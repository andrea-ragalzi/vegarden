package com.vegarden.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vegarden.backend.models.ArticleShared;

public interface ArticleSharedRepository extends JpaRepository<ArticleShared, Long> {
    
    List<ArticleShared> findByArticleId(Long articleId);
}
