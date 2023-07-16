package com.vegarden.backend.controllers;

import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vegarden.backend.models.Article;
import com.vegarden.backend.models.ArticleReaction;
import com.vegarden.backend.models.Zenyte;
import com.vegarden.backend.services.ArticleReactionService;
import com.vegarden.backend.services.ArticleService;
import com.vegarden.backend.services.ZenyteService;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/articles-reactions")
public class ArticleReactionController {

    @Autowired
    private ArticleReactionService articleReactionService;

    @Autowired
    private ZenyteService zenyteService;

    @Autowired
    private ArticleService articleService;

    @GetMapping("/{articleId}/{authorId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Boolean> getArticleReaction(
            @PathVariable Long articleId,
            @PathVariable Long authorId,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Article article = articleService.findArticleById(articleId);
        Zenyte author = zenyteService.findZenyteById(authorId);
        try {
            boolean exists = articleReactionService.existsByArticleAndAuthor(
                    article, author);
            return ResponseEntity.status(HttpStatus.OK).body(exists);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ArticleReaction> postArticleReaction(
            @RequestBody ArticleReaction articleReaction,
            @AuthenticationPrincipal UserDetails userDetails) {
        Timestamp now = new Timestamp(System.currentTimeMillis());
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        try {
            articleReaction.setCreatedAt(now);
            articleReactionService.saveArticleReaction(articleReaction);
            return ResponseEntity.status(HttpStatus.CREATED).body(articleReaction);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ArticleReaction> deleteArticleReaction(
            @RequestBody ArticleReaction articleReaction,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        try {
            System.out.println();
            System.out.println();
            articleReactionService.deleteByArticleAndAuthor(articleReaction.getArticle(), articleReaction.getAuthor());
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(articleReaction);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}
