package com.vegarden.backend.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.vegarden.backend.models.Article;
import com.vegarden.backend.models.Blog;
import com.vegarden.backend.services.ArticleService;
import com.vegarden.backend.services.BlogService;
import com.vegarden.backend.services.ZenyteService;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    @Autowired
    ArticleService articleService;

    @Autowired
    BlogService blogService;

    @Autowired
    ZenyteService zenyteService;

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Article>> getAllArticles() {
        List<Article> articles = articleService.getAllArticles();
        return ResponseEntity.ok(articles);
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Article> getArticleById(@PathVariable Long id) {
        Article article = articleService.findArticleById(id);
        if (article != null) {
            return ResponseEntity.ok(article);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Article> postArticle(
            @RequestBody Article newArticle,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Timestamp now = new Timestamp(System.currentTimeMillis());
        Blog blog = blogService.findBlogByOwner(
                zenyteService.findZenyteByUsername(userDetails.getUsername()));
        Article article = new Article();
        article.setTitle(newArticle.getTitle());
        article.setDescription(newArticle.getDescription());
        article.setBody(newArticle.getBody());
        article.setBlog(blog);
        // TO DO: add body html
        // article.setBodyHtml(newArticle.getBodyHtml());
        article.setCreatedAt(now);
        articleService.saveArticle(article);
        return ResponseEntity.status(HttpStatus.CREATED).body(article);
    }

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Article> updateArticle(
            @PathVariable Long id, @RequestBody Article updatedArticle,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        // Check if the authenticated user has the admin role or if the ID matches the
        // authenticated user
        if (userDetails.getAuthorities().stream().anyMatch(
                role -> role.getAuthority().equals("ROLE_ADMIN")) ||
                userDetails.getUsername().equals(
                        articleService.findArticleById(id).getBlog().getOwner().getUsername())) {
            Timestamp now = new Timestamp(System.currentTimeMillis());
            Article article = articleService.findArticleById(id);
            if (updatedArticle.getTitle() != null) {
                article.setTitle(updatedArticle.getTitle());
            }
            if (updatedArticle.getDescription() != null) {
                article.setDescription(updatedArticle.getDescription());
            }
            if (updatedArticle.getBody() != null) {
                article.setBody(updatedArticle.getBody());
            }
            if (updatedArticle.getBodyHtml() != null) {
                article.setBodyHtml(updatedArticle.getBodyHtml());
            }
            article.setUpdatedAt(now);
            return ResponseEntity.ok(article);
        }
        // Return an error or unauthorized response
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteArticle(
            @PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        // Check if the authenticated user has the admin role or if the ID matches the
        // authenticated user
        if (userDetails.getAuthorities().stream().anyMatch(
                role -> role.getAuthority().equals("ROLE_ADMIN") ||
                role.getAuthority().equals("ROLE_MODERATOR")) ||
                userDetails.getUsername().equals(
                        articleService.findArticleById(id).getBlog().getOwner().getUsername())) {
            articleService.deleteArticleById(id);
            return ResponseEntity.noContent().build();
        }
        // Return an error or unauthorized response
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
