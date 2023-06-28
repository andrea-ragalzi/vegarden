package com.vegarden.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vegarden.backend.models.ArticleComment;

public interface ArticleCommentRepository extends JpaRepository<ArticleComment, Long> {
    
    List<ArticleComment> findByArticleId(Long articleId);
}
