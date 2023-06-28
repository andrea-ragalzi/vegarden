package com.vegarden.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vegarden.backend.models.Article;
import com.vegarden.backend.models.Blog;

public interface ArticleRepository extends JpaRepository<Article, Long> {

    List<Article> findByBlog(Blog blog);
}
