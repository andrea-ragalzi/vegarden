package com.vegarden.backend.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.vegarden.backend.models.Article;
import com.vegarden.backend.models.Blog;
import com.vegarden.backend.services.ArticleService;
import com.vegarden.backend.services.BlogService;
import com.vegarden.backend.services.ZenyteService;

import jakarta.servlet.http.HttpServletRequest;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.ResourceUtils;
import org.springframework.util.StringUtils;
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
            @RequestPart("coverImage") MultipartFile coverImageFile,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            String uploadLocation = "/home/andrea/Workspace/vegarden/backend/src/main/resources/uploads/cover_images";

            // Genera un nome univoco per il file dell'immagine di copertina
            String coverImageFileName = UUID.randomUUID().toString() + "-" + coverImageFile.getOriginalFilename();

            // Crea il percorso completo del file dell'immagine
            String coverImageFilePath = uploadLocation + File.separator + coverImageFileName;

            // Copia l'immagine sul disco
            Files.copy(coverImageFile.getInputStream(), Path.of(coverImageFilePath),
                    StandardCopyOption.REPLACE_EXISTING);

            Timestamp now = new Timestamp(System.currentTimeMillis());
            Blog blog = blogService.findBlogByOwner(
                    zenyteService.findZenyteByUsername(userDetails.getUsername()));
            Article article = new Article();
            article.setTitle(title);
            article.setCoverImageURL(coverImageFilePath);
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
        List<Article> articles = articleService.getAllArticles();
        System.out.println(articles);
        return ResponseEntity.ok(articles);
    }

}
