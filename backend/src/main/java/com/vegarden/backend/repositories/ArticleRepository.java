package com.vegarden.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.vegarden.backend.models.Article;
import com.vegarden.backend.models.Blog;

public interface ArticleRepository extends JpaRepository<Article, Long> {

    List<Article> findByBlog(Blog blog);

    List<Article> findAllByOrderByIdDesc();

    @Query("SELECT a FROM Article a ORDER BY a.reactions DESC")
    List<Article> findAllOrderByReactions();

    /* @Query("SELECT a FROM Article a JOIN a.author.followers f WHERE f.id = :followerId")
    List<Article> findArticlesByFolloweds(@Param("followerId") Long followerId); */

}
