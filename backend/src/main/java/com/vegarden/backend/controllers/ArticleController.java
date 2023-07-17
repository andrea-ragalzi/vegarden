package com.vegarden.backend.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.vegarden.backend.models.Article;
import com.vegarden.backend.models.Blog;
import com.vegarden.backend.services.ArticleService;
import com.vegarden.backend.services.BlogService;
import com.vegarden.backend.services.ZenyteService;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
@RequestMapping("/api/articles")
public class ArticleController {

    @Value("${spring.servlet.uploads.location}")
    private String uploadLocation;

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

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Article> postArticle(
            @RequestPart("title") String title,
            @RequestPart("description") String description,
            @RequestPart("body") String body,
            @RequestPart(value = "coverImage", required = false) MultipartFile coverImage,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Timestamp now = new Timestamp(System.currentTimeMillis());
        Blog blog = blogService.findBlogByOwner(
                zenyteService.findZenyteByUsername(userDetails.getUsername()));
        Article article = new Article();
        try {
            if (coverImage != null) {
                String coverImageFileName = UUID.randomUUID().toString() + "-" + coverImage.getOriginalFilename();
                String coverImageFilePath = uploadLocation + "cover_images" + File.separator + coverImageFileName;
                Files.copy(coverImage.getInputStream(), Path.of(coverImageFilePath),
                        StandardCopyOption.REPLACE_EXISTING);
                article.setCoverImageURL(coverImageFilePath);
            }
            article.setTitle(title);
            article.setDescription(description);
            article.setBody(body);
            article.setBlog(blog);
            article.setAuthor(blog.getOwner());
            article.setCreatedAt(now);
            articleService.saveArticle(article);
            return ResponseEntity.status(HttpStatus.CREATED).body(article);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Article> putArticle(
            @RequestPart("title") String title,
            @RequestPart("description") String description,
            @RequestPart("body") String body,
            @RequestPart(value = "coverImage", required = false) MultipartFile coverImage,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        // TODO find article
        Timestamp now = new Timestamp(System.currentTimeMillis());
        Blog blog = blogService.findBlogByOwner(
                zenyteService.findZenyteByUsername(userDetails.getUsername()));
        Article article = new Article();
        try {
            if (coverImage != null) {
                String coverImageFileName = UUID.randomUUID().toString() + "-" + coverImage.getOriginalFilename();
                String coverImageFilePath = uploadLocation + "cover_images" + File.separator + coverImageFileName;
                Files.copy(coverImage.getInputStream(), Path.of(coverImageFilePath),
                        StandardCopyOption.REPLACE_EXISTING);
                article.setCoverImageURL(coverImageFilePath);
            }
            article.setTitle(title);
            article.setDescription(description);
            article.setBody(body);
            article.setBlog(blog);
            article.setCreatedAt(now);
            articleService.saveArticle(article);
            return ResponseEntity.status(HttpStatus.CREATED).body(article);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
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
                        role.getAuthority().equals("ROLE_MODERATOR"))
                ||
                userDetails.getUsername().equals(
                        articleService.findArticleById(id).getBlog().getOwner().getUsername())) {
            articleService.deleteArticleById(id);
            return ResponseEntity.noContent().build();
        }
        // Return an error or unauthorized response
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("/trend")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Article>> getTrendArticles() {
        List<Article> articles = articleService.findAllOrderByReactions();
        return ResponseEntity.ok(articles);
    }

}
