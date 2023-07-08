package com.vegarden.backend.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vegarden.backend.models.Article;
import com.vegarden.backend.models.Blog;
import com.vegarden.backend.repositories.ArticleRepository;

@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    public Article findArticleById(Long id) {
        Optional<Article> article = articleRepository.findById(id);
        if (article.isPresent()) {
            return article.get();
        } else {
            throw new NoSuchElementException(
                    "Article not found with ID: " + id);
        }
    }

    public void saveArticle(Article article) {
        articleRepository.save(article);
    }

    public void updateArticle(Article article) {
        if (articleRepository.existsById(article.getId())) {
            articleRepository.save(article);
        } else {
            throw new NoSuchElementException(
                    "Article not found with ID: " + article.getId());
        }
    }

    public void deleteArticleById(Long id) {
        if (articleRepository.existsById(id)) {
            articleRepository.deleteById(id);
        } else {
            throw new NoSuchElementException(
                    "Article not found with ID: " + id);
        }
    }

    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    public boolean existsById(Long id) {
        return articleRepository.existsById(id);
    }

    public List<Article> findArticlesByBlog(Blog blog) {
        return articleRepository.findByBlog(blog);
    }

    public List<Article> getTrendArticles() {
        return articleRepository.findAllByOrderByIdDesc();
    }

}
