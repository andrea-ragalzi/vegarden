package com.vegarden.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vegarden.backend.models.Article;
import com.vegarden.backend.models.Blog;
import com.vegarden.backend.models.Zenyte;

public interface ArticleRepository extends JpaRepository<Article, Long> {

    List<Article> findByAuthor(Zenyte author);

    List<Article> findByAuthorAndDisabled(Zenyte author, Boolean disabled);

    List<Article> findByBlog(Blog blog);
}
